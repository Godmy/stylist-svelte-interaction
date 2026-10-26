import formatPhoneNumber from '$stylist/input/function/state/format-phone-number/state.svelte';
import normalizePhoneInputValue from '$stylist/input/function/state/normalize-phone-input-value/state.svelte';
import type { RecipePhoneNumberInput } from '$stylist/input/interface/recipe/phone-number-input';

export const createPhoneNumberInputState = (getProps: () => RecipePhoneNumberInput) => {
	const props = $derived(getProps());
	const error = $derived(props.error ?? false);
	const disabled = $derived(props.disabled ?? false);
	const containerClass = $derived('input-field-container');
	const inputClass = $derived(
		['input-field__control', typeof props.class === 'string' ? props.class : '']
			.filter(Boolean)
			.join(' ')
	);
	const helpTextClass = $derived(error ? 'input-field-error-text' : 'input-field-helper-text');
	const formattedValue = $derived(formatPhoneNumber(props.value ?? ''));
	let value = $derived(props.value ?? '');

	function handleInput(event: Event) {
		props.onInput?.(event);
		const target = event.target as HTMLInputElement;
		const nextValue = normalizePhoneInputValue(target.value);
		value = nextValue;
		target.value = formatPhoneNumber(nextValue);
		props.onValueInput?.(nextValue, event);
		props.onValueChange?.(nextValue);
	}

	return {
		get value() {
			return value;
		},
		get containerClass() {
			return containerClass;
		},
		get inputClass() {
			return inputClass;
		},
		get helpTextClass() {
			return helpTextClass;
		},
		get error() {
			return error;
		},
		get disabled() {
			return disabled;
		},
		get formattedValue() {
			return formattedValue;
		},
		handleInput
	};
};
