import { afterEach, describe, expect, it, vi } from 'vitest';

import { defineComponent, h } from 'vue';

import { flushPromises } from '@vue/test-utils';

import LibraryClientUtility from '@thzero/library_client/utility/index';

import VtCollapseButton from '../components/VtCollapseButton';
import VtFavoriteButton from '../components/VtFavoriteButton';
import VtTags from '../components/VtTags';
import VtAutoCompleteWithValidation from '../components/form/VtAutoCompleteWithValidation';
import VtSelectAutoCompleteWithValidation from '../components/form/VtSelectAutoCompleteWithValidation';
import EditDialog from '../components/admin/users/EditDialog';
import VtFormListing from '../components/form/VtFormListing';
import VtFormListingDialog from '../components/form/VtFormListingDialog';
import { useVtNewsAdminFormDialogComponent } from '../components/admin/news/VtNewsAdminFormDialog';
import { useVtUsersAdminFormDialogComponent } from '../components/admin/users/VtUsersAdminFormDialog';

import { mount } from './mount';

// mounts a renderless component around a composable
const mountComposable = (composable, options) => {
	let api;
	mount(defineComponent({
		emits: [ 'cancel', 'ok' ],
		setup(props, context) {
			api = composable(props, context, options);
			return () => h('div');
		}
	}));
	return api;
};

const toggles = (Component) => {
	it('declares the events it sends', () => {
		expect(Component.emits).toEqual(expect.arrayContaining([ 'click', 'update:modelValue' ]));
	});

	it('mounts', () => {
		// default-imported a composable-only base: it never mounted
		const wrapper = mount(Component, { props: { modelValue: false } });

		expect(wrapper.findComponent({ name: 'VBtn' }).exists()).toBe(true);
	});

	it('toggles through v-model after the debounce', async () => {
		vi.useFakeTimers();
		try {
			const update = vi.fn();
			const wrapper = mount(Component, { props: { modelValue: false, 'onUpdate:modelValue': update } });
			await flushPromises();
			update.mockClear();

			await wrapper.findComponent({ name: 'VBtn' }).trigger('click');
			await vi.advanceTimersByTimeAsync(500);

			expect(update).toHaveBeenLastCalledWith(true);
			expect(wrapper.emitted('click')).toHaveLength(1);
		}
		finally {
			vi.useRealTimers();
		}
	});

	it('debounces each button on its own', async () => {
		vi.useFakeTimers();
		try {
			const first = vi.fn();
			const second = vi.fn();
			const a = mount(Component, { props: { modelValue: false, 'onUpdate:modelValue': first } });
			const b = mount(Component, { props: { modelValue: false, 'onUpdate:modelValue': second } });
			await flushPromises();
			first.mockClear();
			second.mockClear();

			await a.findComponent({ name: 'VBtn' }).trigger('click');
			await b.findComponent({ name: 'VBtn' }).trigger('click');
			await vi.advanceTimersByTimeAsync(500);

			// a debounce in methods is shared by every instance: the first click was dropped
			expect(first).toHaveBeenLastCalledWith(true);
			expect(second).toHaveBeenLastCalledWith(true);
		}
		finally {
			vi.useRealTimers();
		}
	});
};

describe('VtCollapseButton', () => toggles(VtCollapseButton));
describe('VtFavoriteButton', () => toggles(VtFavoriteButton));

describe('VtTags', () => {
	it('declares the event v-model listens for', () => {
		// it declared value, Vue 2's v-model prop; only attribute fallthrough reached the combobox
		expect(VtTags.emits).toContain('update:modelValue');
		expect(Object.keys(VtTags.props)).toContain('modelValue');
	});

	it('sends the tags back through v-model', async () => {
		const update = vi.fn();
		// extended a composable-only base and bound Vuetify 2's .sync
		const wrapper = mount(VtTags, { props: { modelValue: [], 'onUpdate:modelValue': update } });

		await wrapper.findComponent({ name: 'VCombobox' }).vm.$emit('update:modelValue', [ 'a' ]);

		expect(update).toHaveBeenLastCalledWith([ 'a' ]);
	});
});

describe('VtAutoCompleteWithValidation', () => {
	it('queries for items as the user types', async () => {
		vi.useFakeTimers();
		try {
			const querySelection = vi.fn(async () => [ { id: 1, name: 'one' } ]);
			const wrapper = mount(VtAutoCompleteWithValidation, { props: { querySelection } });

			// :search-input.sync never fed the watcher, so no query ever ran
			await wrapper.findComponent({ name: 'VAutocomplete' }).vm.$emit('update:search', 'on');
			await vi.advanceTimersByTimeAsync(50);
			await flushPromises();

			expect(querySelection).toHaveBeenCalledWith('on');
			expect(wrapper.findComponent({ name: 'VAutocomplete' }).props('items')).toEqual([ { id: 1, name: 'one' } ]);
		}
		finally {
			vi.useRealTimers();
		}
	});
});

describe('VtSelectAutoCompleteWithValidation', () => {
	it('mounts an autocomplete over its items', async () => {
		// extended an undefined baseControlEdit: it never loaded
		const wrapper = mount(VtSelectAutoCompleteWithValidation, { props: { items: [ { id: 1, name: 'one' } ] } });
		await flushPromises();

		expect(wrapper.findComponent({ name: 'VAutocomplete' }).props('items')).toEqual([ { id: 1, name: 'one' } ]);
	});

	it('titles an item by displayName when it has one', () => {
		const wrapper = mount(VtSelectAutoCompleteWithValidation, { props: { items: [] } });

		expect(wrapper.vm.text({ name: 'n', displayName: 'd' })).toBe('d');
		expect(wrapper.vm.text({ name: 'n' })).toBe('n');
	});

	it('sends the choice back through v-model', async () => {
		const update = vi.fn();
		const wrapper = mount(VtSelectAutoCompleteWithValidation, { props: { items: [ { id: 1, name: 'one' } ], 'onUpdate:modelValue': update } });

		await wrapper.findComponent({ name: 'VAutocomplete' }).vm.$emit('update:modelValue', 1);

		expect(update).toHaveBeenLastCalledWith(1);
	});
});

describe('admin form dialogs', () => {
	afterEach(() => {
		delete LibraryClientUtility.$store;
	});

	const store = () => {
		const dispatcher = {
			adminNews: {
				createAdminNews: vi.fn(async () => ({ success: true })),
				updateAdminNews: vi.fn(async () => ({ success: true }))
			},
			adminUsers: {
				updateAdminUser: vi.fn(async () => ({ success: true }))
			}
		};
		LibraryClientUtility.$store = { dispatcher };
		return dispatcher;
	};

	it('creates news without an id', async () => {
		const dispatcher = store();
		const api = mountComposable(useVtNewsAdminFormDialogComponent);
		await api.resetDialog('id', { title: 't' });

		await api.preComplete('id');

		expect(dispatcher.adminNews.createAdminNews).toHaveBeenCalled();
		expect(dispatcher.adminNews.createAdminNews.mock.calls[0][1].updatedTimestamp).toBeUndefined();
	});

	it('updates news with an id, keeping updatedTimestamp', async () => {
		const dispatcher = store();
		const api = mountComposable(useVtNewsAdminFormDialogComponent);
		await api.resetDialog('id', { id: 'n', title: 't', updatedTimestamp: 5 });

		await api.preComplete('id');

		// the server rejects an update without it
		expect(dispatcher.adminNews.updateAdminNews.mock.calls[0][1]).toMatchObject({ id: 'n', updatedTimestamp: 5 });
	});

	it('lists the roles from an array or an object', () => {
		store();
		expect(mountComposable(useVtUsersAdminFormDialogComponent, { getRoles: () => [ 'a', 'b' ] }).roles.value).toEqual([ 'a', 'b' ]);
		// for...of over an object threw
		expect(mountComposable(useVtUsersAdminFormDialogComponent, { getRoles: () => ({ A: 'a' }) }).roles.value).toEqual([ 'a' ]);
		expect(mountComposable(useVtUsersAdminFormDialogComponent).roles.value).toEqual([]);
	});

	it('updates a user with the edited roles only', async () => {
		const dispatcher = store();
		const api = mountComposable(useVtUsersAdminFormDialogComponent, { getRoles: () => [ 'admin', 'user' ] });
		await api.resetDialog('id', { id: 'u', roles: [ 'user' ], updatedTimestamp: 7, external: { id: 'x', name: 'N' } });
		expect(api.userRoles.value).toEqual([ 'user' ]);
		expect(api.name.value).toBe('N');

		api.userRoles.value = [ 'admin', 'user' ];
		await api.preComplete('id');

		expect(dispatcher.adminUsers.updateAdminUser).toHaveBeenCalledWith('id', { id: 'u', roles: [ 'admin', 'user' ], updatedTimestamp: 7 });
	});
});

describe('admin users EditDialog', () => {
	afterEach(() => {
		delete LibraryClientUtility.$store;
	});

	it('mounts on VtFormDialog', () => {
		// built on VFormDialog, v-layout and v-flex
		const wrapper = mount(EditDialog, { props: { roles: [ 'admin' ] } });

		expect(wrapper.findComponent({ name: 'VtFormDialog' }).exists()).toBe(true);
	});

	it('takes the user from reset, as the listing calls it', async () => {
		LibraryClientUtility.$store = { dispatcher: {} };
		const wrapper = mount(EditDialog, { props: { roles: [ 'admin', 'user' ] } });

		await wrapper.vm.reset('id', { id: 'u', roles: [ 'user' ], external: { id: 'x', name: 'N' } });

		expect(wrapper.vm.userRoles).toEqual([ 'user' ]);
		expect(wrapper.vm.roleItems).toEqual([ 'admin', 'user' ]);
	});
});

describe('form listings', () => {
	it.each([ [ 'VtFormListing', VtFormListing ], [ 'VtFormListingDialog', VtFormListingDialog ] ])('%s declares everything its composable emits', (name, Component) => {
		// delete and reset were missing
		expect(Component.emits).toEqual(expect.arrayContaining([ 'close', 'delete', 'error', 'ok', 'open', 'reset' ]));
	});
});
