import type { RecipeCheckbox as CheckboxProps } from '$stylist/control/interface/recipe/checkbox';

export function createCheckboxState(props: CheckboxProps) {
	const id = props.id;
	const label = props.label;
	const description = props.description ?? '';
	const checked = props.checked ?? false;
	const errors = props.errors ?? [];
	const required = props.required ?? false;
	const disabled = props.disabled ?? false;
	const size = (props as { size?: string }).size ?? 'md';
	const className = props.class ?? '';

	const hasError = errors.length > 0;
	const errorId = `${id}-error`;
	const containerClass = ['c-checkbox', className].filter(Boolean).join(' ');

	return {
		id,
		label,
		description,
		checked,
		errors,
		required,
		disabled,
		size,
		hasError,
		errorId,
		containerClass
	};
}

export default createCheckboxState;
