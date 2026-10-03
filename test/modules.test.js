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

// Known not to load from these tests, though fixed: a module that imports something
// not yet published to npm, which is where the tests take their dependencies from.
// it.fails passes while one cannot load; when it can, the test fails, which is the
// prompt to take it off this list. Empty since library_client_vue3 0.19.2 shipped the
// admin composables the two admin listings import.
const broken = {};

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
