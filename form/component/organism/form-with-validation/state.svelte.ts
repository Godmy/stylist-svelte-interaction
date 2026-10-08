import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import type { HTMLAttributes } from 'svelte/elements';
export function createFormWithValidationState(
	getProps: () => HTMLAttributes<HTMLFormElement> & {
		email?: string;
		password?: string;
		class?: string;
	}
): {
	rootClass: string;
	inputClass: string;
	emailValidText: string;
	emailValidClass: string;
	passwordValidText: string;
	passwordValidClass: string;
} {
	const props = $derived(getProps());
	const emailValid = $derived(props.email?.includes('@') ?? false);
	const passwordValid = $derived((props.password?.length ?? 0) >= 8);

	const rootClass = $derived(ClassNamesManager.merge('c-form-with-validation', props.class ?? ''));
	const inputClass = $derived('c-form-with-validation__input');
	const emailValidText = $derived(emailValid ? 'Valid email' : 'Enter valid email');
	const emailValidClass = $derived(
		`c-form-with-validation__hint ${emailValid ? 'c-form-with-validation__hint--valid' : 'c-form-with-validation__hint--invalid'}`
	);
	const passwordValidText = $derived(passwordValid ? 'Strong enough' : 'Min 8 chars');
	const passwordValidClass = $derived(
		`c-form-with-validation__hint ${passwordValid ? 'c-form-with-validation__hint--valid' : 'c-form-with-validation__hint--invalid'}`
	);

	return {
		get rootClass() {
			return rootClass;
		},
		get inputClass() {
			return inputClass;
		},
		get emailValidText() {
			return emailValidText;
		},
		get emailValidClass() {
			return emailValidClass;
		},
		get passwordValidText() {
			return passwordValidText;
		},
		get passwordValidClass() {
			return passwordValidClass;
		}
	};
}

export default createFormWithValidationState;
