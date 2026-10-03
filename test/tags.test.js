import { describe, expect, it, vi } from 'vitest';

import VtTagsWithValidation from '../components/form/VtTagsWithValidation';

import { mount } from './mount';

describe('VtTagsWithValidation', () => {
	it('declares the event v-model listens for', () => {
		expect(VtTagsWithValidation.emits).toContain('update:modelValue');
	});

	it('mounts', () => {
		// it returned an undeclared text from setup, a ReferenceError on every mount
		const wrapper = mount(VtTagsWithValidation, { props: { modelValue: [ 'a' ] } });

		expect(wrapper.findComponent({ name: 'VCombobox' }).exists()).toBe(true);
	});

	it('sends the tags back through v-model', async () => {
		const update = vi.fn();
		const wrapper = mount(VtTagsWithValidation, { props: { modelValue: [], max: 5, 'onUpdate:modelValue': update } });

		await wrapper.findComponent({ name: 'VCombobox' }).vm.$emit('update:modelValue', [ 'a', 'b' ]);

		// it emitted the Vue 2 'input', which a Vue 3 v-model never hears
		expect(update).toHaveBeenLastCalledWith([ 'a', 'b' ]);
	});

	it('keeps no more than max tags', async () => {
		const update = vi.fn();
		const wrapper = mount(VtTagsWithValidation, { props: { modelValue: [], max: 2, 'onUpdate:modelValue': update } });

		await wrapper.findComponent({ name: 'VCombobox' }).vm.$emit('update:modelValue', [ 'a', 'b', 'c' ]);

		// the watcher that was meant to enforce this never fired
		expect(update).toHaveBeenLastCalledWith([ 'a', 'b' ]);
	});
});
