import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { TOKEN_ORIENTATION } from '$stylist/layout/const/array/orientation';

export function createValidationState(
	getProps: () => HTMLAttributes<HTMLDivElement> & {
		label?: string;
		description?: string;
		required?: boolean;
		error?: string;
		hint?: string;
		disabled?: boolean;
		orientation?: (typeof TOKEN_ORIENTATION)[number];
		class?: string;
		id?: string;
		children: Snippet;
	}
): {
	containerClasses: string;
	hasError: boolean;
	rootClass: string;
	labelClass: string;
	requiredMarkClass: string;
	contentClass: string;
	descriptionClass: string;
	errorClass: string;
	hintClass: string;
} {
	const props = $derived(getProps());
	const containerClasses = $derived(
		`field-group ${props.orientation === 'horizontal' ? 'horizontal' : 'vertical'} ${props.disabled ? 'field-group--disabled' : ''} ${props.class ?? ''}`
	);
	const hasError = $derived(!!props.error);

	const rootClass = $derived('field-group');
	const labelClass = $derived('field-label');
	const requiredMarkClass = $derived('field-required-mark');
	const contentClass = $derived('field-content');
	const descriptionClass = $derived('field-description');
	const errorClass = $derived('field-error');
	const hintClass = $derived('field-hint');

	return {
		get containerClasses() {
			return containerClasses;
		},
		get hasError() {
			return hasError;
		},
		get rootClass() {
			return rootClass;
		},
		get labelClass() {
			return labelClass;
		},
		get requiredMarkClass() {
			return requiredMarkClass;
		},
		get contentClass() {
			return contentClass;
		},
		get descriptionClass() {
			return descriptionClass;
		},
		get errorClass() {
			return errorClass;
		},
		get hintClass() {
			return hintClass;
		}
	};
}

export default createValidationState;
