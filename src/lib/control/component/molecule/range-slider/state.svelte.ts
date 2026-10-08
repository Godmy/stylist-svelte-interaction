import type { RecipeRangeSlider } from '$stylist/control/interface/recipe/range-slider';

export function createRangeSliderState(getProps: () => RecipeRangeSlider) {
	const props = $derived(getProps());
	const isRange = $derived(props.range ?? false);
	const min = $derived(props.min ?? 0);
	const max = $derived(props.max ?? 100);
	const disabled = $derived(props.disabled ?? false);
	let value = $state<number | [number, number]>(props.value ?? 0);

	$effect(() => {
		if (isRange && !Array.isArray(value)) {
			value = [min, max];
		}
		if (!isRange && Array.isArray(value)) {
			value = value[0];
		}
	});

	const minPercentage = $derived(
		isRange && Array.isArray(value) ? ((value[0] - min) / (max - min)) * 100 : 0
	);

	const maxPercentage = $derived(
		isRange && Array.isArray(value)
			? ((value[1] - min) / (max - min)) * 100
			: (((value as number) - min) / (max - min)) * 100
	);

	const fillStyle = $derived(
		isRange && Array.isArray(value)
			? `left: ${minPercentage}%; width: ${maxPercentage - minPercentage}%`
			: `left: 0%; width: ${maxPercentage}%`
	);

	const containerClass = $derived(['c-range-slider', props.class].filter(Boolean).join(' '));
	const labelContainerClass = 'c-range-slider__header';
	const labelClass = 'c-range-slider__label';
	const valueDisplayClass = 'c-range-slider__value';
	const trackContainerClass = 'c-range-slider__track-wrap';
	const trackClass = 'c-range-slider__track';
	const fillClass = $derived(
		['c-range-slider__fill', disabled ? 'c-range-slider__fill--disabled' : '']
			.filter(Boolean)
			.join(' ')
	);
	const thumbClass = $derived(
		['c-range-slider__thumb', disabled ? 'c-range-slider__thumb--disabled' : '']
			.filter(Boolean)
			.join(' ')
	);
	const minMaxLabelClass = 'c-range-slider__minmax';
	const descriptionClass = 'c-range-slider__description';

	function updateSingle(nextValue: number) {
		value = Math.min(Math.max(nextValue, min), max);
	}

	function updateRange(index: 0 | 1, nextValue: number) {
		const current = Array.isArray(value) ? value : [min, max];
		const next: [number, number] = [current[0], current[1]];
		next[index] = Math.min(Math.max(nextValue, min), max);
		if (next[0] > next[1]) {
			next[index === 0 ? 1 : 0] = next[index];
		}
		value = next;
	}

	return {
		get isRange() {
			return isRange;
		},
		get value() {
			return value;
		},
		get min() {
			return min;
		},
		get max() {
			return max;
		},
		get disabled() {
			return disabled;
		},
		get minPercentage() {
			return minPercentage;
		},
		get maxPercentage() {
			return maxPercentage;
		},
		get fillStyle() {
			return fillStyle;
		},
		get containerClass() {
			return containerClass;
		},
		get labelContainerClass() {
			return labelContainerClass;
		},
		get labelClass() {
			return labelClass;
		},
		get valueDisplayClass() {
			return valueDisplayClass;
		},
		get trackContainerClass() {
			return trackContainerClass;
		},
		get trackClass() {
			return trackClass;
		},
		get fillClass() {
			return fillClass;
		},
		get thumbClass() {
			return thumbClass;
		},
		get minMaxLabelClass() {
			return minMaxLabelClass;
		},
		get descriptionClass() {
			return descriptionClass;
		},
		get showValue() {
			return props.showValue ?? true;
		},
		get step() {
			return props.step ?? 1;
		},
		get label() {
			return props.label;
		},
		get description() {
			return props.description;
		},
		get id() {
			return props.id;
		},
		updateSingle,
		updateRange
	};
}

export default createRangeSliderState;
