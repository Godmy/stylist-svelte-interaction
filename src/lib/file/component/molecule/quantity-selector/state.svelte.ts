import type { RecipeQuantitySelector } from '$stylist/file/interface/recipe/quantity-selector';

export function createQuantitySelectorState(getProps: () => RecipeQuantitySelector) {
	const props = $derived(getProps());
	let quantity = $state(props.value ?? 1);
	const inputId = $derived(`quantity-${Math.random().toString(36).slice(2, 9)}`);

	$effect(() => {
		quantity = props.value ?? 1;
	});

	const rootClasses = $derived(['c-qty-selector', props.class].filter(Boolean).join(' '));
	const labelClasses = 'c-qty-selector__label';
	const containerClasses = 'c-qty-selector__controls';
	const decrementButtonClasses = $derived(
		['c-qty-selector__btn', 'c-qty-selector__btn--decrement', props.buttonClass]
			.filter(Boolean)
			.join(' ')
	);
	const incrementButtonClasses = $derived(
		['c-qty-selector__btn', 'c-qty-selector__btn--increment', props.buttonClass]
			.filter(Boolean)
			.join(' ')
	);
	const inputClasses = $derived(
		['c-qty-selector__input', props.inputClass].filter(Boolean).join(' ')
	);

	function increment() {
		const { disabled = false, max = 99, step = 1, onValueChange, onIncrement } = props;
		if (disabled || quantity >= max) return;
		const newValue = Math.min(quantity + step, max);
		quantity = newValue;
		onValueChange?.(newValue);
		onIncrement?.(newValue);
	}

	function decrement() {
		const { disabled = false, min = 1, step = 1, onValueChange, onDecrement } = props;
		if (disabled || quantity <= min) return;
		const newValue = Math.max(quantity - step, min);
		quantity = newValue;
		onValueChange?.(newValue);
		onDecrement?.(newValue);
	}

	function handleInputChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const min = props.min ?? 1;
		const max = props.max ?? 99;
		const step = props.step ?? 1;
		let newValue = parseInt(target.value) || min;
		newValue = Math.max(min, Math.min(max, newValue));
		if (step > 1) {
			newValue = Math.round(newValue / step) * step;
			newValue = Math.max(min, Math.min(max, newValue));
		}
		quantity = newValue;
		props.onValueChange?.(newValue);
	}

	return {
		get quantity() {
			return quantity;
		},
		get inputId() {
			return inputId;
		},
		get rootClasses() {
			return rootClasses;
		},
		get labelClasses() {
			return labelClasses;
		},
		get containerClasses() {
			return containerClasses;
		},
		get decrementButtonClasses() {
			return decrementButtonClasses;
		},
		get incrementButtonClasses() {
			return incrementButtonClasses;
		},
		get inputClasses() {
			return inputClasses;
		},
		increment,
		decrement,
		handleInputChange
	};
}
