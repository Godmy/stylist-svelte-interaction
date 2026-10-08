import { resolveAllowedOption } from '$stylist/input/function/script/resolve-allowed-option';
import { TOKEN_COLOR_TONE } from '$stylist/theme/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/theme/const/array/size';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { SlotInputStateOptions } from '$stylist/input/interface/slot/input-state-options';

export const createTextareaState = (
	getProps: () => SlotInputStateOptions & {
		id?: string;
		value?: string;
		maxlength?: number;
		helperText?: string;
		showHelperWhenError?: boolean;
		autoResize?: boolean;
	}
) => {
	const props = $derived(getProps());
	const variant = $derived(
		resolveAllowedOption(props.variant as TokenColorTone | undefined, TOKEN_COLOR_TONE, 'default')
	);
	const size = $derived(
		resolveAllowedOption(props.size as TokenSize | undefined, TOKEN_SIZE, 'md')
	);
	const disabled = $derived(!!props.disabled);
	const hasError = $derived(!!props.error);
	const errorId = $derived(props.id ? `${String(props.id)}-error` : undefined);
	const labelId = $derived(props.id ? `${String(props.id)}-label` : undefined);
	const currentLength = $derived(String(props.value ?? '').length);
	const remainingChars = $derived(
		typeof props.maxlength === 'number' ? props.maxlength - currentLength : null
	);
	const showHelper = $derived(!!props.helperText && (!!props.showHelperWhenError || !hasError));
	const classes = $derived(
		['input-field__control', typeof props.class === 'string' ? props.class : '']
			.filter(Boolean)
			.join(' ')
	);

	function autoResizeTextarea(textareaElement: HTMLTextAreaElement | null) {
		if (!props.autoResize || !textareaElement) {
			return;
		}

		textareaElement.style.height = 'auto';
		textareaElement.style.height = `${textareaElement.scrollHeight}px`;
	}

	function handleInput(textareaElement: HTMLTextAreaElement | null) {
		autoResizeTextarea(textareaElement);
	}

	return {
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get disabled() {
			return disabled;
		},
		get classes() {
			return classes;
		},
		get hasError() {
			return hasError;
		},
		get errorId() {
			return errorId;
		},
		get labelId() {
			return labelId;
		},
		get currentLength() {
			return currentLength;
		},
		get remainingChars() {
			return remainingChars;
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
		get showHelper() {
			return showHelper;
		},
		autoResizeTextarea,
		handleInput
	};
};

export default createTextareaState;
