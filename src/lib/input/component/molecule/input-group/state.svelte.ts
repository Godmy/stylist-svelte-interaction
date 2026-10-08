import createInputTextState from '$stylist/input/component/molecule/input-text/state.svelte';
import type { RecipeInputGroup as IInputGroupProps } from '$stylist/input/interface/recipe/input-group';

export const createInputGroupState = (getProps: () => IInputGroupProps) => {
	const props = $derived(getProps());
	const hasError = $derived(!!props.error || (props.errors?.length ?? 0) > 0);
	const errorId = $derived(props.id ? `${props.id}-error` : undefined);
	const labelId = $derived(props.id ? `${props.id}-label` : undefined);
	const inputState = $derived(
		createInputTextState({
			variant: props.variant,
			size: props.size,
			disabled: props.disabled,
			error: hasError,
			block: false,
			class: props.class
		})
	);
	const showHelper = $derived(!!props.helperText && (props.showHelperWhenError || !hasError));

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		props.onValueInput?.(target.value);
	}

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		props.onValueChange?.(target.value);
	}

	return {
		get hasError() {
			return hasError;
		},
		get errorId() {
			return errorId;
		},
		get labelId() {
			return labelId;
		},
		get inputClasses() {
			return inputState.classes;
		},
		get inputVariant() {
			return inputState.variant;
		},
		get inputSize() {
			return inputState.size;
		},
		get containerClasses() {
			return 'input-field-container';
		},
		get labelClasses() {
			return 'input-field-label';
		},
		get helperTextClasses() {
			return 'input-field-helper-text';
		},
		get errorTextClasses() {
			return 'input-field-error-text';
		},
		get requiredIndicatorClasses() {
			return 'input-field-required';
		},
		get groupContainerClasses() {
			return 'input-group-container';
		},
		get groupInputClasses() {
			return 'input-group-input';
		},
		get groupButtonClasses() {
			return 'input-group-button';
		},
		get showHelper() {
			return showHelper;
		},
		handleInput,
		handleChange
	};
};

export default createInputGroupState;
