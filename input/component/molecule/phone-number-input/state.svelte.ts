import formatPhoneNumber from '$stylist/input/function/state/format-phone-number/index.svelte';
import normalizePhoneInputValue from '$stylist/input/function/state/normalize-phone-input-value/index.svelte';
import type { SlotPhoneNumberInput as IPhoneNumberInputProps } from '$stylist/input/interface/slot/phone-number-input';

export const createPhoneNumberInputState = (getProps: () => IPhoneNumberInputProps) => {
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

	function handleInput(event: Event) {
		props.onInput?.(event);
		const target = event.target as HTMLInputElement;
		const nextValue = normalizePhoneInputValue(target.value);
		props.value = nextValue;
		props.onValueInput?.(nextValue, event);
		props.onValueChange?.(nextValue);
	}

	return {
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
