import createInputTextState from '$stylist/input/component/molecule/input-text/state.svelte';
import type { RecipeInputPassword as IInputPasswordProps } from '$stylist/input/interface/recipe/input-password';

export const createInputPasswordState = (getProps: () => IInputPasswordProps) => {
	const props = $derived(getProps());
	const hasError = $derived(!!props.error || (props.errors?.length ?? 0) > 0);
	const errorId = $derived(props.id ? `${String(props.id)}-error` : undefined);
	const labelId = $derived(props.id ? `${String(props.id)}-label` : undefined);
	const currentType = $derived(props.showPassword ? 'text' : 'password');
	const inputState = $derived(
		createInputTextState({
			variant: props.variant,
			size: props.size,
			disabled: props.disabled,
			error: hasError,
			block: props.block,
			class: props.class
		})
	);
	const showHelper = $derived(!!props.helperText && (!!props.showHelperWhenError || !hasError));
	const passwordStrength = $derived.by(() => {
		const value = String(props.value ?? '');
		if (!value || !props.showPasswordStrength) {
			return null;
		}

		let strength = 0;
		if (value.length >= 8) strength++;
		if (value.length >= 12) strength++;
		if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
		if (/\d/.test(value)) strength++;
		if (/[^a-zA-Z0-9]/.test(value)) strength++;

		const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
		const colors = ['ps-danger', 'ps-orange', 'ps-yellow', 'ps-lime', 'ps-success'];

		return {
			value: strength,
			label: labels[Math.min(strength, 4)],
			color: colors[Math.min(strength, 4)],
			percentage: (strength / 5) * 100
		};
	});

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
		get currentType() {
			return currentType;
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
		get passwordToggleClasses() {
			return 'input-password-toggle';
		},
		get showHelper() {
			return showHelper;
		},
		get passwordStrength() {
			return passwordStrength;
		}
	};
};

export default createInputPasswordState;
