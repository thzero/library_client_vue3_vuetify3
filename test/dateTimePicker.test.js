import { describe, expect, it, vi } from 'vitest';

import VtDateTimePickerBase from '../components/form/VtDateTimePickerBase';
import VtDateTimePickerField from '../components/form/VtDateTimePickerField';
import VtDateTimePickerFieldFns from '../components/form/VtDateTimePickerFieldFns';
import VtDateTimePickerFieldWithValidation from '../components/form/VtDateTimePickerFieldWithValidation';

import { mount } from './mount';

const base = (wrapper) => wrapper.findComponent(VtDateTimePickerBase);
const shown = (wrapper) => wrapper.find('input').element.value;

describe.each([
	[ 'VtDateTimePickerField (dayjs)', VtDateTimePickerField ],
	[ 'VtDateTimePickerFieldFns (date-fns)', VtDateTimePickerFieldFns ]
])('%s', (name, component) => {
	it('shows a formatted value', () => {
		const wrapper = mount(component, { props: { modelValue: '2026-09-30 14:05' } });

		expect(shown(wrapper)).toBe('2026-09-30 14:05');
	});

	it('shows a timestamp value formatted', () => {
		const wrapper = mount(component, { props: { modelValue: new Date(2026, 8, 30, 14, 5).getTime() } });

		expect(shown(wrapper)).toBe('2026-09-30 14:05');
	});

	it('shows nothing for no value', () => {
		const wrapper = mount(component, { props: { modelValue: null } });

		expect(shown(wrapper)).toBe('');
	});

	it('OK sends the formatted value through v-model', async () => {
		const update = vi.fn();
		const wrapper = mount(component, { props: { modelValue: '2026-09-30 14:05', 'onUpdate:modelValue': update } });

		base(wrapper).vm.okHandler();

		// it emitted the Vue 2 'input', which a Vue 3 v-model never hears
		expect(update).toHaveBeenCalledWith('2026-09-30 14:05');
	});

	it('OK sends a timestamp when outputType is timestamp', async () => {
		const update = vi.fn();
		const wrapper = mount(component, { props: { modelValue: '2026-09-30 14:05', outputType: 'timestamp', 'onUpdate:modelValue': update } });

		base(wrapper).vm.okHandler();

		expect(update).toHaveBeenCalledWith(new Date(2026, 8, 30, 14, 5).getTime());
	});

	it('Clear sends null', async () => {
		const update = vi.fn();
		const wrapper = mount(component, { props: { modelValue: '2026-09-30 14:05', 'onUpdate:modelValue': update } });

		base(wrapper).vm.clearHandler();

		expect(update).toHaveBeenCalledWith(null);
	});
});

describe('VtDateTimePickerFieldWithValidation', () => {
	it('declares the event v-model listens for', () => {
		expect(VtDateTimePickerFieldWithValidation.emits).toContain('update:modelValue');
	});

	it('shows the value and sends changes through v-model', async () => {
		const update = vi.fn();
		const wrapper = mount(VtDateTimePickerFieldWithValidation, { props: { modelValue: '2026-09-30 14:05', 'onUpdate:modelValue': update } });
		await wrapper.vm.$nextTick();

		expect(shown(wrapper)).toBe('2026-09-30 14:05');

		base(wrapper).vm.okHandler();

		expect(update).toHaveBeenCalledWith('2026-09-30 14:05');
	});
});
