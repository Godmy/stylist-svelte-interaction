import type { RecipeToggleButtonGroup } from '$stylist/form/interface/recipe/toggle-button-group';

export function createToggleButtonGroupState(props: RecipeToggleButtonGroup) {
	let selectedValues = $state<string[]>(
		Array.isArray(props.value) ? props.value : props.value ? [props.value] : []
	);

	$effect(() => {
		const nextValue = Array.isArray(props.value) ? props.value : props.value ? [props.value] : [];
		if (JSON.stringify(selectedValues) !== JSON.stringify(nextValue)) {
			selectedValues = nextValue;
		}
	});

	const size = $derived(props.size ?? 'md');

	function handleToggle(optionValue: string) {
		if (props.disabled || props.options.find((option) => option.value === optionValue)?.disabled) {
			return;
		}

		let nextValues: string[];

		if (props.multiple) {
			nextValues = selectedValues.includes(optionValue)
				? selectedValues.filter((value) => value !== optionValue)
				: [...selectedValues, optionValue];
		} else {
			nextValues = selectedValues.includes(optionValue) ? [] : [optionValue];
		}

		selectedValues = nextValues;

		const nextValue = props.multiple ? nextValues : nextValues[0] || '';
		props.onValueInput?.(nextValue);
		props.onValueChange?.(nextValue);
		props.onInput?.(nextValue);
		props.onChange?.(nextValue);
	}

	function isSelected(optionValue: string) {
		return selectedValues.includes(optionValue);
	}

	return {
		get selectedValues() {
			return selectedValues;
		},
		get size() {
			return size;
		},
		handleToggle,
		isSelected
	};
}

export default createToggleButtonGroupState;
