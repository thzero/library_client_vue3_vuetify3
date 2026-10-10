<script>
import { onUnmounted } from 'vue';
import { useTheme } from 'vuetify';

import LibraryClientConstants from '@thzero/library_client/constants';

import LibraryClientUtility from '@thzero/library_client/utility/index';

const ThemeDefault = 'defaultTheme';
const ThemeDarkSuffix = 'Dark';

// The application's Vuetify theme: the user's theme, or options.themeDefault,
// with its Dark twin while the system prefers dark, and following the system
// when it changes. Each light theme needs a '<name>Dark' twin registered.
// Called from the application component's setup().
export function useThemeComponent(props, context, options) {
	const serviceStore = LibraryClientUtility.$injector.getService(LibraryClientConstants.InjectorKeys.SERVICE_STORE);

	const theme = useTheme();
	const themeDefault = options?.themeDefault ?? ThemeDefault;

	const userTheme = () => {
		return !String.isNullOrEmpty(serviceStore.userTheme) ? serviceStore.userTheme : themeDefault;
	};
	const themeName = (dark) => {
		return userTheme() + (dark ? ThemeDarkSuffix : '');
	};
	const changeTheme = (dark) => {
		// theme.change, not theme.global.name.value =, which Vuetify 4 deprecates
		theme.change(themeName(dark));
	};

	const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
	const listener = (event) => changeTheme(event.matches);

	changeTheme(media ? media.matches : false);
	if (media)
		media.addEventListener('change', listener);

	onUnmounted(() => {
		if (media)
			media.removeEventListener('change', listener);
	});

	return {
		changeTheme,
		theme,
		themeName,
		userTheme
	};
};
</script>
