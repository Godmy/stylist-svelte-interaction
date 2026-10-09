import type { SlotRangeInput as RecipeRangeInput } from '$stylist/control/interface/slot/range-input';

export const createRangeInputState = (getProps: () => RecipeRangeInput) => {
	const props = $derived(getProps());
	let minVal = $state(props.minValue ?? props.min ?? 0);
	let maxVal = $state(props.maxValue ?? props.max ?? 100);

	function update(kind: 'min' | 'max', value: number) {
		if (kind === 'min') minVal = Math.min(Math.max(value, props.min ?? 0), maxVal);
		if (kind === 'max') maxVal = Math.max(Math.min(value, props.max ?? 100), minVal);
		props.onInput?.({ min: minVal, max: maxVal });
	}

	function commit() {
		props.onChange?.({ min: minVal, max: maxVal });
	}

	const minPercentage = $derived(
		((minVal - (props.min ?? 0)) / ((props.max ?? 100) - (props.min ?? 0))) * 100
	);
	const maxPercentage = $derived(
		((maxVal - (props.min ?? 0)) / ((props.max ?? 100) - (props.min ?? 0))) * 100
	);
	const fillStyle = $derived(`left: ${minPercentage}%; width: ${maxPercentage - minPercentage}%;`);

	return {
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
		get showInputFields() {
			return props.showInputFields ?? true;
		},
		get className() {
			return props.class ?? '';
		},
		get rangeClass() {
			return props.rangeClass ?? '';
		},
		get inputClass() {
			return props.inputClass ?? '';
		},
		get minVal() {
			return minVal;
		},
		set minVal(value: number) {
			minVal = value;
		},
		get maxVal() {
			return maxVal;
		},
		set maxVal(value: number) {
			maxVal = value;
		},
		get fillStyle() {
			return fillStyle;
		},
		update,
		commit
	};
};
