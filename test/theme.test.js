import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import LibraryClientConstants from '@thzero/library_client/constants';
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useThemeComponent } from '../components/theme';

import { mountComposable } from './mount';

// useTheme records the theme it is changed to
const theme = vi.hoisted(() => ({ change: vi.fn() }));
vi.mock('vuetify', async (original) => ({ ...(await original()), useTheme: () => theme }));

let store;
let matchMedia;

beforeEach(() => {
	theme.change.mockClear();
	store = { userTheme: null };
	const injector = LibraryClientUtility.$injector;
	LibraryClientUtility.$injector = { getService: (key) => key === LibraryClientConstants.InjectorKeys.SERVICE_STORE ? store : injector.getService(key) };
	matchMedia = window.matchMedia;
});

afterEach(() => {
	window.matchMedia = matchMedia;
});

// Mounts with the system preferring dark or light; returns the media query
// the composable listens to.
const mount = (dark, options) => {
	const media = { matches: dark, addEventListener: vi.fn(), removeEventListener: vi.fn() };
	window.matchMedia = vi.fn((query) => (query === '(prefers-color-scheme: dark)' ? media : { matches: false, addEventListener() {}, removeEventListener() {} }));
	const { wrapper, api } = mountComposable(useThemeComponent, { options });
	// the last: the mount helper's Vuetify registers its own first
	const listener = media.addEventListener.mock.calls.filter((l) => l[0] === 'change').at(-1)[1];
	return { wrapper, api, media, listener };
};

const last = () => theme.change.mock.calls.at(-1)[0];

describe('useThemeComponent', () => {
	it('uses the default theme in light mode', () => {
		mount(false);

		expect(last()).toBe('defaultTheme');
	});

	it('uses the Dark twin when the system prefers dark', () => {
		mount(true);

		expect(last()).toBe('defaultThemeDark');
	});

	it('uses the user\'s theme', () => {
		store.userTheme = 'redTheme';

		mount(true);

		expect(last()).toBe('redThemeDark');
	});

	it('takes another default theme', () => {
		mount(false, { themeDefault: 'blueTheme' });

		expect(last()).toBe('blueTheme');
	});

	// Vuetify 4 deprecates assigning theme.global.name.value
	it('changes the theme through theme.change', () => {
		mount(false);

		expect(theme.change).toHaveBeenCalledTimes(1);
	});

	it('follows the system when it switches', () => {
		const { listener } = mount(false);

		listener({ matches: true });
		expect(last()).toBe('defaultThemeDark');

		listener({ matches: false });
		expect(last()).toBe('defaultTheme');
	});

	it('picks up a theme the user changed since', () => {
		const { listener } = mount(false);

		store.userTheme = 'redTheme';
		listener({ matches: true });

		expect(last()).toBe('redThemeDark');
	});

	it('stops following the system once unmounted', () => {
		const { wrapper, media, listener } = mount(false);

		wrapper.unmount();

		expect(media.removeEventListener).toHaveBeenCalledWith('change', listener);
	});

	it('names the theme for either mode', () => {
		const { api } = mount(false);

		expect(api.themeName(true)).toBe('defaultThemeDark');
		expect(api.themeName(false)).toBe('defaultTheme');
	});
});
