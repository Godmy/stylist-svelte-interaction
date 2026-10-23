import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/svelte';
import InputText from '$stylist/input/component/molecule/input-text/index.svelte';
import InputPassword from '$stylist/input/component/molecule/input-password/index.svelte';
import InputGroup from '$stylist/input/component/molecule/input-group/index.svelte';
import TextArea from '$stylist/input/component/molecule/text-area/index.svelte';
import NumberInput from '$stylist/input/component/molecule/number-input/index.svelte';
import PhoneNumberInput from '$stylist/input/component/molecule/phone-number-input/index.svelte';
import InputPinDigit from '$stylist/input/component/atom/input-pin-digit/index.svelte';
import InputAddon from '$stylist/input/component/atom/input-addon/index.svelte';
import CharactersCount from '$stylist/input/component/atom/characters-count/index.svelte';
import RadioButtonGroup from '$stylist/input/component/molecule/radio-button-group/index.svelte';
import RadioGroup from '$stylist/input/component/molecule/radio-group/index.svelte';
import CheckboxGroup from '$stylist/input/component/molecule/checkbox-group/index.svelte';
import TagInput from '$stylist/input/component/organism/tag-input/index.svelte';
import RichTextEditor from '$stylist/input/component/organism/rich-text-editor/index.svelte';

afterEach(cleanup);

describe('input compositions preserve the HTML contract', () => {
	it('requires at least one checkbox, without requiring every option', async () => {
		const view = render(CheckboxGroup, {
			required: true,
			options: [
				{ id: 'first', value: 'a', label: 'First' },
				{ id: 'second', value: 'b', label: 'Second' }
			]
		});
		const first = view.getByLabelText('First') as HTMLInputElement;
		expect(first.checkValidity()).toBe(false);
		await fireEvent.click(view.getByLabelText('Second'));
		expect(first.required).toBe(false);
		expect(first.checkValidity()).toBe(true);
	});
	it.each([InputText, InputPassword, InputGroup, TextArea])(
		'associates generated labels and rendered descriptions',
		(component) => {
			const view = render(component, { label: 'Field', helperText: 'Helpful', value: '' });
			const control = view.getByLabelText('Field');
			const description = view.getByText('Helpful');
			expect(control.id).not.toBe('');
			expect(control.getAttribute('aria-describedby')?.split(' ')).toContain(description.id);
			expect(description.id).not.toBe('');
		}
	);
	it.each([InputPassword, InputGroup, TextArea, PhoneNumberInput, InputPinDigit])(
		'forwards native attributes and input events to its control',
		async (component) => {
			const oninput = vi.fn();
			const view = render(component, {
				id: 'native',
				name: 'field',
				value: '',
				'aria-label': 'Native',
				'data-consumer': 'kept',
				oninput
			});
			const control = view.getByLabelText('Native');
			expect(control.id).toBe('native');
			expect(control.getAttribute('name')).toBe('field');
			expect(control.getAttribute('data-consumer')).toBe('kept');
			await fireEvent.input(control, { target: { value: '1' } });
			expect(oninput).toHaveBeenCalledOnce();
		}
	);
	it('uses errors as invalid state and describes only existing feedback', async () => {
		const view = render(TextArea, {
			id: 'area',
			value: '',
			errors: ['Required'],
			helperText: 'Hint',
			'aria-describedby': 'external'
		});
		const area = view.container.querySelector('textarea')!;
		expect(area.getAttribute('aria-invalid')).toBe('true');
		expect(view.getByRole('alert').id).toBe('area-error');
		expect(area.getAttribute('aria-describedby')).toBe('external area-error');
		await view.rerender({ errors: [], showErrors: false });
		expect(area.getAttribute('aria-describedby')).toBe('external area-helper');
	});
	it('does not replace NumberInput classes or leak composition props to the input', async () => {
		const oninput = vi.fn();
		const view = render(NumberInput, {
			value: 3,
			name: 'quantity',
			min: 3,
			max: 9,
			step: 2,
			class: 'host',
			inputClass: 'control',
			buttonClass: 'action',
			oninput
		});
		const input = view.container.querySelector('input')!;
		expect(input.classList.contains('number-input__input')).toBe(true);
		expect(input.classList.contains('control')).toBe(true);
		for (const name of ['inputclass', 'buttonclass']) expect(input.hasAttribute(name)).toBe(false);
		await fireEvent.input(input, { target: { value: '7' } });
		expect(oninput).toHaveBeenCalledOnce();
		expect(input.value).toBe('7');
	});
	it.each([InputAddon, CharactersCount])(
		'keeps native metadata on a supporting composition',
		(component) => {
			const view = render(component, { id: 'support', title: 'Context', 'data-consumer': 'kept' });
			expect(view.container.firstElementChild?.id).toBe('support');
			expect(view.container.firstElementChild?.getAttribute('title')).toBe('Context');
		}
	);
	it('makes a password toggle available from the keyboard', async () => {
		const view = render(InputPassword, { value: 'secret', label: 'Password' });
		const toggle = view.getByRole('button', { name: 'Show password' });
		expect(toggle.tabIndex).toBe(0);
		await fireEvent.click(toggle);
		expect(view.container.querySelector('input')?.type).toBe('text');
	});
	it('keeps radio custom classes and native group selection', async () => {
		const onValueChange = vi.fn();
		const view = render(RadioButtonGroup, {
			name: 'radio',
			value: 'a',
			orientation: 'horizontal',
			optionClass: 'option',
			labelClass: 'label',
			radioClass: 'native-radio',
			options: [
				{ value: 'a', label: 'A' },
				{ value: 'b', label: 'B' }
			],
			onValueChange
		});
		const b = view.getByLabelText('B');
		expect(b.classList.contains('native-radio')).toBe(true);
		expect(b.closest('label')?.classList.contains('option')).toBe(true);
		await fireEvent.click(b);
		expect(onValueChange).toHaveBeenLastCalledWith('b');
		expect((b as HTMLInputElement).checked).toBe(true);
	});
	it('forwards RadioGroup native events without treating the group container as an input', async () => {
		const onchange = vi.fn();
		const view = render(RadioGroup, {
			name: 'plan',
			form: 'outside-form',
			label: 'Plan',
			options: [
				{ value: 'a', label: 'A' },
				{ value: 'b', label: 'B' }
			],
			onchange
		});
		const b = view.getByLabelText('B');
		expect(b.getAttribute('form')).toBe('outside-form');
		await fireEvent.click(b);
		expect(onchange).toHaveBeenCalledOnce();
	});
	it('uses one accessible checkbox label and honours itemClass', () => {
		const view = render(CheckboxGroup, {
			name: 'choices',
			itemClass: 'consumer-item',
			options: [{ id: 'a', value: 'a', label: 'Choice' }]
		});
		expect(view.getAllByText('Choice')).toHaveLength(1);
		expect(view.container.querySelector('.consumer-item')).toBeTruthy();
	});
	it('keeps disabled tag actions disabled and names removal buttons', () => {
		const view = render(TagInput, { tags: ['alpha'], disabled: true, class: 'consumer' });
		const button = view.getByRole('button', { name: 'Remove alpha' });
		expect(button.hasAttribute('disabled')).toBe(true);
		expect(view.container.firstElementChild?.classList.contains('c-tag-input')).toBe(true);
		expect(view.container.firstElementChild?.hasAttribute('tags')).toBe(false);
	});
	it('updates contenteditable from external values without emitting an edit', async () => {
		const onValueInput = vi.fn();
		const view = render(RichTextEditor, {
			value: '<p>Initial</p>',
			showToolbar: false,
			class: 'consumer',
			onValueInput
		});
		const editor = view.getByRole('textbox');
		expect(editor.innerHTML).toBe('<p>Initial</p>');
		await view.rerender({ value: '<p>Updated</p>' });
		expect(editor.innerHTML).toBe('<p>Updated</p>');
		expect(onValueInput).not.toHaveBeenCalled();
		expect(view.container.firstElementChild?.classList.contains('rich-text-editor')).toBe(true);
		for (const name of ['value', 'showtoolbar', 'editorclass'])
			expect(view.container.firstElementChild?.hasAttribute(name)).toBe(false);
	});
});
