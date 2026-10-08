import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { HTMLAttributes } from 'svelte/elements';
export function createLoginFormState(
	getProps: () => HTMLAttributes<HTMLFormElement> & {
		email?: string;
		rememberMe?: boolean;
		class?: string;
	}
): {
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
