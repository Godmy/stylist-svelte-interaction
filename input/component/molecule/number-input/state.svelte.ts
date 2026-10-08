import type { SlotNumberInput as INumberInputProps } from '$stylist/input/interface/slot/number-input';

export const createNumberInputState = (getProps: () => INumberInputProps) => {
	const props = $derived(getProps());
	let currentValue = $state(props.value ?? 0);

	$effect(() => {
		currentValue = props.value ?? 0;
	});

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
		props.onValueInput?.(currentValue);
		props.onValueChange?.(currentValue);
		props.onChange?.(currentValue);
	}

	function increment() {
		if (disabled || readonly) return;

		const newValue = currentValue + step;
		if (newValue <= max) {
			currentValue = newValue;
			emitChange();
		}
	}

	function decrement() {
		if (disabled || readonly) return;

		const newValue = currentValue - step;
		if (newValue >= min) {
			currentValue = newValue;
			emitChange();
		}
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		const newValue = parseFloat(target.value);

		if (Number.isNaN(newValue)) {
			return;
		}

		let clampedValue = Math.min(Math.max(newValue, min), max);
		if (step !== 0) {
			clampedValue = Math.round(clampedValue / step) * step;
		}

		currentValue = clampedValue;
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
		set currentValue(value: number) {
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
