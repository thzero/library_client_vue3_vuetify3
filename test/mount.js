import { defineComponent, h } from 'vue';

import { mount as vueMount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import LibraryClientConstants from '@thzero/library_client/constants';
import LibraryClientUtility from '@thzero/library_client/utility/index';

// the services the base composables resolve through the injector
const services = {
	[LibraryClientConstants.InjectorKeys.SERVICE_CONFIG]: { get: () => null },
	[LibraryClientConstants.InjectorKeys.SERVICE_LOGGER]: { debug() {}, error() {}, exception() {}, info2() {} }
};
LibraryClientUtility.$injector = { getService: (key) => services[key] ?? null };
LibraryClientUtility.$trans = { t: (key, values) => (values ? `${key} ${JSON.stringify(values)}` : key) };

// Mounts with a fresh Vuetify. A caller's global plugins and mocks are added to
// Vuetify's rather than replacing them.
export const mount = (component, options = {}) => {
	const global = options.global ?? {};
	return vueMount(component, {
		...options,
		global: {
			...global,
			plugins: [ createVuetify({ components, directives }), ...(global.plugins ?? []) ],
			mocks: { $t: (key) => key, ...(global.mocks ?? {}) }
		}
	});
};

// Mounts a renderless component around a composable, so a test can drive it
// through the component's props and emits; returns the wrapper and what the
// composable returned. The same shape as library_client_vue3's test/mount.js.
export const mountComposable = (composable, { props = {}, emits = [], options, attrs = {} } = {}) => {
	let api;
	const Component = defineComponent({
		props,
		emits,
		setup(propsI, context) {
			api = composable(propsI, context, options);
			return () => h('div');
		}
	});
	const wrapper = mount(Component, { props: attrs });
	return { wrapper, api };
};

// the minimum of a vuelidate instance the form composables touch
export const validation = (valid = true) => ({
	$validate: async () => valid,
	$reset: async () => {},
	$invalid: !valid,
	$silentErrors: [],
	$anyDirty: true
});
