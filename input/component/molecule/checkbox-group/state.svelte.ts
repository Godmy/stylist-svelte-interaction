import type { RecipeCheckboxGroup } from '$stylist/input/interface/recipe/checkbox-group';

export function createCheckboxGroupState(getProps: () => RecipeCheckboxGroup) {
	const props = $derived(getProps());
	let selectedValues = $derived<string[]>([...(props.value ?? [])]);

	function handleChange(optionValue: string, checked: boolean) {
		const nextValues = checked
			? [...selectedValues, optionValue]
			: selectedValues.filter((value) => value !== optionValue);

		selectedValues = nextValues;
		props.onValueInput?.(nextValues);
		props.onValueChange?.(nextValues);
		props.onInput?.(nextValues);
		props.onChange?.(nextValues);
	}

	function handleItemChange(optionValue: string) {
		return (event: Event & { currentTarget: HTMLInputElement }) => {
			handleChange(optionValue, event.currentTarget.checked);
		};
	}

	return {
		get selectedValues() {
			return selectedValues;
		},
		handleChange,
		handleItemChange
	};
}

export default createCheckboxGroupState;
