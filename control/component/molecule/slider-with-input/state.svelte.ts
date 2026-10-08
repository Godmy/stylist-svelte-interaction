import type { RecipeSliderWithInput } from '$stylist/control/interface/recipe/slider-with-input';

export const createSliderWithInputState = (getProps: () => RecipeSliderWithInput) => {
	const props = $derived(getProps());
	let currentValue = $state(props.value ?? 0);

	$effect(() => {
		if (currentValue !== (props.value ?? 0)) {
			currentValue = props.value ?? 0;
		}
	});

	function handleSliderChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const newValue = parseFloat(target.value);
		currentValue = newValue;
		props.onValueInput?.(newValue);
		props.onValueChange?.(newValue);
		props.onInput?.(newValue);
	}

	function handleInputChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const newValue = parseFloat(target.value);
		const clampedValue = Math.min(Math.max(newValue, props.min ?? 0), props.max ?? 100);
		currentValue = clampedValue;
		props.onValueInput?.(clampedValue);
		props.onValueChange?.(clampedValue);
		props.onInput?.(clampedValue);
	}

	function handleInputBlur(event: FocusEvent) {
		const target = event.target as HTMLInputElement;
		const value = parseFloat(target.value);
		if (Number.isNaN(value)) {
			target.value = currentValue.toString();
			return;
		}

		let clampedValue = Math.min(Math.max(value, props.min ?? 0), props.max ?? 100);
		if ((props.step ?? 1) !== 0) {
			clampedValue = Math.round(clampedValue / (props.step ?? 1)) * (props.step ?? 1);
		}

		currentValue = clampedValue;
		target.value = clampedValue.toString();
		props.onValueChange?.(clampedValue);
		props.onChange?.(clampedValue);
	}

	return {
		get currentValue() {
			return currentValue;
		},
		set currentValue(value: number) {
			currentValue = value;
		},
		get min() {
			return props.min ?? 0;
		},
		get max() {
			return props.max ?? 100;
		},
		get step() {
			return props.step ?? 1;
		},
		get disabled() {
			return props.disabled ?? false;
		},
		get showInput() {
			return props.showInput ?? true;
		},
		get inputWidth() {
			return props.inputWidth ?? '80px';
		},
		get className() {
			return props.class ?? '';
		},
		get sliderClass() {
			return props.sliderClass ?? '';
		},
		get inputClass() {
			return props.inputClass ?? '';
		},
		handleSliderChange,
		handleInputChange,
		handleInputBlur
	};
};

export default createSliderWithInputState;
