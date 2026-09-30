import { mount as vueMount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import LibraryClientConstants from '@thzero/library_client/constants';
import LibraryClientUtility from '@thzero/library_client/utility/index';

// jsdom lacks these browser APIs, and Vuetify reaches for them on mount
if (!globalThis.ResizeObserver) {
	globalThis.ResizeObserver = class {
		observe() {}
		unobserve() {}
		disconnect() {}
	};
}
if (!window.matchMedia) {
	window.matchMedia = (query) => ({
		matches: false,
		media: query,
		addListener() {},
		removeListener() {},
		addEventListener() {},
		removeEventListener() {},
		dispatchEvent() { return false; }
	});
}

// the services the base composables resolve through the injector
const services = {
	[LibraryClientConstants.InjectorKeys.SERVICE_LOGGER]: { debug() {}, error() {}, exception() {}, info2() {} }
};
LibraryClientUtility.$injector = { getService: (key) => services[key] ?? null };
LibraryClientUtility.$trans = { t: (key, values) => (values ? `${key} ${JSON.stringify(values)}` : key) };

export const mount = (component, options = {}) => vueMount(component, {
	...options,
	global: {
		plugins: [ createVuetify({ components, directives }) ],
		mocks: { $t: (key) => key },
		...(options.global ?? {})
	}
});
