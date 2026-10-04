import { describe, expect, it, vi } from 'vitest';

import { flushPromises } from '@vue/test-utils';

import VtDirectionButton from '../components/VtDirectionButton';
import VtDisplayDialog from '../components/VtDisplayDialog';
import VtLoadingOverlay from '../components/VtLoadingOverlay';
import VtFormControl from '../components/form/VtFormControl';

import { mount } from './mount';

const overlay = (wrapper) => wrapper.findComponent({ name: 'VOverlay' });

const validation = {
	$validate: async () => true,
	$reset: async () => {},
	$invalid: false,
	$silentErrors: [],
	$anyDirty: true
};

describe('VtLoadingOverlay', () => {
	it('shows while loading', () => {
		const wrapper = mount(VtLoadingOverlay, { props: { signal: false } });

		// bound :value, which a Vuetify 3 v-overlay ignores, so it never showed
		expect(overlay(wrapper).props('modelValue')).toBe(true);
	});

	it('hides once loaded', async () => {
		const wrapper = mount(VtLoadingOverlay, { props: { signal: false } });

		await wrapper.setProps({ signal: true });

		expect(overlay(wrapper).props('modelValue')).toBe(false);
	});

	it('centers its contents', () => {
		const wrapper = mount(VtLoadingOverlay, { props: { signal: false } });

		// VOverlay's location prop has no default, so without these the content
		// sat in the overlay's top-left corner
		expect(overlay(wrapper).props('class')).toBe('align-center justify-center');
	});

	it('resizes the spinner with the window', async () => {
		const wrapper = mount(VtLoadingOverlay, { props: { signal: false } });
		const progress = () => wrapper.findComponent({ name: 'VProgressCircular' }).props('size');
		const before = progress();

		window.innerWidth = 400;
		window.innerHeight = 400;
		window.dispatchEvent(new window.Event('resize'));
		await flushPromises();

		// sized off window.innerWidth, which is not reactive, so the computed was
		// evaluated once and the spinner kept its first size for the session
		expect(progress()).not.toBe(before);
		expect(progress()).toBe(100);
	});
});

describe('VtFormControl', () => {
	it('shows the saving overlay while an auto save runs', async () => {
		let finish;
		const preCompleteOk = () => new Promise((resolve) => { finish = resolve; });
		const wrapper = mount(VtFormControl, { props: { autoSave: true, preCompleteOk, validation } });
		expect(overlay(wrapper).props('modelValue')).toBe(false);

		const saving = wrapper.vm.submit();
		await flushPromises();

		// bound :value, so "Saving..." never showed
		expect(overlay(wrapper).props('modelValue')).toBe(true);

		finish({ success: true });
		await saving;
		await flushPromises();
		expect(overlay(wrapper).props('modelValue')).toBe(false);
	});
});

describe('VtDisplayDialog', () => {
	it('declares the events it sends', () => {
		expect(VtDisplayDialog.emits).toEqual(expect.arrayContaining([ 'cancel', 'ok' ]));
	});
});

describe('VtDirectionButton', () => {
	it('sends one update for a burst of clicks', async () => {
		vi.useFakeTimers();
		try {
			const update = vi.fn();
			const wrapper = mount(VtDirectionButton, { props: { modelValue: false, 'onUpdate:modelValue': update } });
			// mounting sets the value from modelValue, which sends it back once
			await flushPromises();
			update.mockClear();

			wrapper.vm.click(true);
			wrapper.vm.click(false);
			wrapper.vm.click(true);
			await vi.advanceTimersByTimeAsync(499);
			expect(update).not.toHaveBeenCalled();

			await vi.advanceTimersByTimeAsync(1);

			// a new debounce per click: each click's value landed in turn
			expect(update.mock.calls).toEqual([ [ true ] ]);
		}
		finally {
			vi.useRealTimers();
		}
	});

	it('does not write to the console', async () => {
		vi.useFakeTimers();
		const log = vi.spyOn(console, 'log').mockImplementation(() => {});
		try {
			const wrapper = mount(VtDirectionButton, { props: { modelValue: false } });

			wrapper.vm.click(true);
			await vi.advanceTimersByTimeAsync(500);

			expect(log).not.toHaveBeenCalled();
		}
		finally {
			log.mockRestore();
			vi.useRealTimers();
		}
	});
});
