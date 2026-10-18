import type { RecipeAutoSearch } from '$stylist/search/interface/recipe/auto-search';

export function createAutoSearchState(getProps: () => RecipeAutoSearch) {
	const props = $derived(getProps());
	let localValue = $derived(props.value ?? '');
	const rootClass = $derived(('auto-search' + (props.class ? ` ${props.class}` : '')).trim());
	const inputClass = $derived('auto-search__input');
	const iconWrapperClass = $derived('auto-search__icon-wrapper');

	const handleInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		localValue = target.value;
		props.onValueInput?.(localValue);
		props.onValueChange?.(localValue);
		props.onInput?.(localValue);
	};

	return {
		get localValue() {
			return localValue;
		},
		get rootClass() {
			return rootClass;
		},
		get inputClass() {
			return inputClass;
		},
		get iconWrapperClass() {
			return iconWrapperClass;
		},
		handleInput
	};
}

export default createAutoSearchState;
