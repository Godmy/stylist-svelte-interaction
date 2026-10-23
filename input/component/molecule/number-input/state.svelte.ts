import type { RecipeNumberInput } from '$stylist/input/interface/recipe/number-input';

export const createNumberInputState = (
	getProps: () => RecipeNumberInput,
	getElement?: () => HTMLInputElement | null
) => {
	const props = $derived(getProps());
	let currentValue = $derived<number | undefined>(props.value);

	const disabled = $derived(props.disabled ?? false);
	const readonly = $derived(props.readonly ?? false);
	const min = $derived(props.min ?? Number.MIN_SAFE_INTEGER);
	const max = $derived(props.max ?? Number.MAX_SAFE_INTEGER);
	const step = $derived(props.step ?? 1);
	const containerClasses = $derived(['number-input', props.class ?? ''].filter(Boolean).join(' '));
	const inputClasses = $derived(
		['number-input__input', disabled ? 'number-input__input--disabled' : '', props.inputClass ?? '']
			.filter(Boolean)
			.join(' ')
	);
	const buttonClasses = $derived(
		[
			'number-input__button',
			disabled ? 'number-input__button--disabled' : '',
			props.buttonClass ?? ''
		]
			.filter(Boolean)
			.join(' ')
	);

	function emitChange() {
		if (currentValue === undefined || !Number.isFinite(currentValue)) return;
		props.onValueInput?.(currentValue);
		props.onValueChange?.(currentValue);
		props.onChange?.(currentValue);
	}

	function increment() {
		if (disabled || readonly) return;

		const element = getElement?.();
		if (element) {
			element.stepUp();
			currentValue = element.valueAsNumber;
			emitChange();
		}
	}

	function decrement() {
		if (disabled || readonly) return;

		const element = getElement?.();
		if (element) {
			element.stepDown();
			currentValue = element.valueAsNumber;
			emitChange();
		}
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		// Typing preserves the browser value and validity; only step buttons normalise it.
		currentValue = target.value === '' ? undefined : target.valueAsNumber;
		emitChange();
	}

	return {
		get disabled() {
			return disabled;
		},
		get readonly() {
			return readonly;
		},
		get min() {
			return min;
		},
		get max() {
			return max;
		},
		get step() {
			return step;
		},
		get currentValue() {
			return currentValue;
		},
		set currentValue(value: number | undefined) {
			currentValue = value;
		},
		get containerClasses() {
			return containerClasses;
		},
		get inputClasses() {
			return inputClasses;
		},
		get decrementButtonClasses() {
			return `${buttonClasses} number-input__button--decrement`;
		},
		get incrementButtonClasses() {
			return `${buttonClasses} number-input__button--increment`;
		},
		increment,
		decrement,
		handleInput,
		emitChange
	};
};
