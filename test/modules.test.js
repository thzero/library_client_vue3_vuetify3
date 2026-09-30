import { describe, expect, it } from 'vitest';

// Every module in the package loads: catches imports that resolve to nothing,
// undefined identifiers at module scope and syntax errors.
const modules = import.meta.glob([
	'../boot/**/*.js',
	'../components/**/*.{js,vue}',
	'../layouts/**/*.{js,vue}',
	'../service/**/*.js',
	'../utility/**/*.js',
	'../constants.js',
	'../openSource.js'
]);

// Known not to load, and waiting on the decision whether to port or delete them
// (TODO_CLIENT.md, Decisions 1). it.fails passes while they stay broken; fixing
// one makes its test fail, which is the prompt to take it off this list.
const broken = {
	// AUDIT_CLIENT.md CA1: imports of VMarkdown, VMarkdownEditor, VSelectWithValidation
	// and admin baseListing files that do not exist
	'../components/admin/news/VtNewsAdminFormDialog.vue': 'CA1',
	'../components/admin/news/baseListing.vue': 'CA1',
	'../components/admin/users/VtUsersAdminFormDialog.vue': 'CA1',
	'../components/admin/users/baseListing.vue': 'CA1',
	// imports VtUsersAdminFormDialog
	'../components/admin/users/EditDialog.vue': 'CA1',
	// AUDIT_CLIENT.md CA3: extends baseControlEdit, which is never imported
	'../components/form/VtSelectAutoCompleteWithValidation.vue': 'CA3'
};

const keys = Object.keys(modules);

describe('modules', () => {
	it('finds the modules', () => {
		expect(keys.length).toBeGreaterThan(40);
	});

	it('lists only known-broken modules that exist', () => {
		expect(Object.keys(broken).filter(key => !keys.includes(key))).toEqual([]);
	});

	it.each(keys.filter(key => !broken[key]))('%s loads', async (key) => {
		expect(await modules[key]()).toBeDefined();
	});

	it.fails.each(keys.filter(key => broken[key]))('%s does not load yet', async (key) => {
		expect(await modules[key]()).toBeDefined();
	});
});
