import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeSearchForm } from '$stylist/search/interface/recipe/search-form';
export function createSearchFormState(getProps: () => RecipeSearchForm): {
	rootClass: string;
	iconClass: string;
	inputClass: string;
	submitButtonClass: string;
} {
	const props = $derived(getProps());
	const rootClass = $derived(ClassNamesManager.merge('c-search-form', props.class ?? ''));
	const iconClass = $derived('c-search-form__icon');
	const inputClass = $derived('c-search-form__input');
	const submitButtonClass = $derived('c-search-form__submit');

	return {
		get rootClass() {
			return rootClass;
		},
		get iconClass() {
			return iconClass;
		},
		get inputClass() {
			return inputClass;
		},
		get submitButtonClass() {
			return submitButtonClass;
		}
	};
}

export default createSearchFormState;
