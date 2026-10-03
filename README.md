![GitHub package.json version](https://img.shields.io/github/package-json/v/thzero/library_client_vue3_vuetify3)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# library_client_vue3_vuetify3

[Vuetify](https://vuetifyjs.com) components for [library_client_vue3](https://github.com/thzero/library_client_vue3): form fields with validation messages, form dialogs and listings, confirmation and display dialogs, layouts, and the standard pages. Each one is a thin template over a library_client_vue3 composable.

## Requirements

### NodeJs

[NodeJs](https://nodejs.org) version 22+.

## Installation

[![NPM](https://nodei.co/npm/@thzero/library_client_vue3_vuetify3.png?compact=true)](https://npmjs.org/package/@thzero/library_client_vue3_vuetify3)

```
npm install @thzero/library_client_vue3_vuetify3 vuetify
```

It requires `vuetify` (`^4`), `@thzero/library_client`, `@thzero/library_client_vue3` and `@thzero/library_common` as peers. It installs `@vuelidate/core` and `@vuelidate/validators` for validation, `@vuepic/vue-datepicker`, and `dayjs` and `date-fns` for the date pickers.

## Setup

### UI boot

Add a UI boot file that sets the Vuetify options and calls this package's `boot/ui`, which creates Vuetify and installs it:

```js
import 'vuetify/styles';

import BaseBoot from '@thzero/library_client/boot/base';

import bootUi from '@thzero/library_client_vue3_vuetify3/boot/ui';

export default class UiBoot extends BaseBoot {
	async execute(framework, router, store, options) {
		options.vuetify = {
			theme: {
				defaultTheme: 'light'
			}
		};

		await bootUi({ framework, options });
	}
}
```

Add it to the boot files passed to `start` (see [library_client_vue3](https://github.com/thzero/library_client_vue3#mainjs)). `boot/cookie` adds the cookie consent banner (`vue-cookie-comply`) the same way.

Import the icon font the components use in `main.js`:

```js
import '@mdi/font/css/materialdesignicons.css';
```

### Translations

The components use the translation keys listed in [library_client_vue3](https://github.com/thzero/library_client_vue3#locales).

## Components

Import a component and register it:

```js
import VtFormDialog from '@thzero/library_client_vue3_vuetify3/components/form/VtFormDialog';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';
```

| Area | Components |
|---|---|
| Form fields (`components/form`) | `VtTextField`, `VtTextArea`, `VtNumberField`, `VtSelect`, and the `...WithValidation` versions: `VtTextFieldWithValidation`, `VtTextAreaWithValidation`, `VtNumberFieldWithValidation`, `VtSelectWithValidation`, `VtSelectAutoCompleteWithValidation`, `VtAutoCompleteWithValidation`, `VtCheckboxWithValidation`, `VtSwitchWithValidation`, `VtColorWithValidation`, `VtTagsWithValidation` |
| Date and time (`components/form`) | `VtDateTimePickerFieldTemp` and `VtDateTimePickerFieldWithValidationTemp` on `@vuepic/vue-datepicker`; `VtDateTimePickerField` (dayjs), `VtDateTimePickerFieldFns` (date-fns) and `VtDateTimePickerFieldWithValidation` on Vuetify |
| Forms (`components/form`) | `VtFormControl`, `VtFormDialog`, `VtFormListing`, `VtFormListingDialog`, `VtListing`, `VtServerErrorDisplay` |
| Dialogs and overlays | `VtConfirmationDialog`, `VtDisplayDialog`, `VtLoadingOverlay` |
| Buttons and inputs | `VtCollapseButton`, `VtDirectionButton`, `VtFavoriteButton`, `VtTags` |
| Pages | `VtAuth`, `VtCopyright`, `VtCookieComply`, `VtLayoutFooter`, `VtNotFound`, `VtOpenSource`, `VtVersion` |
| Markdown (`components/markup`) | `VtMarkdown`, `VtMarkdownEditor` |
| Layouts (`layouts`) | `AdminLayout`, `AuthLayout`, `BlankLayout` |

The `Temp` pair is the established one. The Vuetify pair is newer and has so far only been tested outside a browser.

### Validation

The `...WithValidation` fields show [Vuelidate](https://vuelidate-next.netlify.app) errors. Give each the form's validation object and the name of its rule as `vid`:

```html
<VtFormDialog
	:signal="signal"
	:pre-complete-ok="preCompleteOk"
	:validation="validation"
	@close="close"
	@ok="ok"
>
	<VtTextFieldWithValidation
		v-model="name"
		vid="name"
		:label="$t('forms.name')"
		:validation="validation"
	/>
</VtFormDialog>
```

```js
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
	setup(props, context) {
		const name = ref('');
		// ...
		return { name, validation: useVuelidate({ $scope: 'NameDialog' }) };
	},
	validations() {
		return { name: { required, $autoDirty: true } };
	}
};
```

`VtFormDialog` validates before `preCompleteOk`, and closes only after a successful save.

### Admin

The admin pages are composables for the application's own admin components to call, plus one ready component:

* `components/admin/news/baseListing` and `components/admin/users/baseListing`: the listings, with Vuetify table headers.
* `components/admin/news/VtNewsAdminFormDialog` and `components/admin/users/VtUsersAdminFormDialog`: the edit dialogs' logic.
* `components/admin/users/EditDialog`: the user edit dialog, which edits roles; pass the roles the application knows as `roles`.

They need the store's `adminNews` and `adminUsers` modules (see [library_client_vue3_store_pinia](https://github.com/thzero/library_client_vue3_store_pinia#modules)) and the admin services (`boot/adminServices` in library_client_vue3).

## Development

```
npm install
npm test
npm run lint
```

Tests use [Vitest](https://vitest.dev) and mount the components under Vuetify. They take the other `@thzero` packages from npm, so a component that needs an unpublished change to library_client_vue3 cannot load in these tests until that is published. The `test` folder and the configuration files are not published.

## License

[MIT](license.md)
