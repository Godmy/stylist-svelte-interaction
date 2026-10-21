import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { RecipeLoginForm } from '$stylist/form/interface/recipe/login-form';
export function createLoginFormState(getProps: () => RecipeLoginForm): {
	rootClass: string;
	inputClass: string;
	checkboxLabelClass: string;
	submitButtonClass: string;
} {
	const props = $derived(getProps());
	const rootClass = $derived(ClassNamesManager.merge('c-login-form', props.class ?? ''));
	const inputClass = $derived('c-login-form__input');
	const checkboxLabelClass = $derived('c-login-form__checkbox-label');
	const submitButtonClass = $derived('c-login-form__submit');

	return {
		get rootClass() {
			return rootClass;
		},
		get inputClass() {
			return inputClass;
		},
		get checkboxLabelClass() {
			return checkboxLabelClass;
		},
		get submitButtonClass() {
			return submitButtonClass;
		}
	};
}

export default createLoginFormState;
