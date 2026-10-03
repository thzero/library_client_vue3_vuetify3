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

// Known not to load from these tests, though fixed. The tests take library_client_vue3
// from npm, and these two import admin composables added to it on 1 Oct 2026; they
// load once that is published. it.fails passes while they cannot load; when they
// can, the test fails, which is the prompt to take them off this list.
const broken = {
	'../components/admin/news/baseListing.vue': 'needs library_client_vue3 > 0.18 published',
	'../components/admin/users/baseListing.vue': 'needs library_client_vue3 > 0.18 published'
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
