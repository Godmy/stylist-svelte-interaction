import { resolveAllowedOption } from '$stylist/input/function/script/resolve-allowed-option';
import { TOKEN_COLOR_TONE } from '$stylist/theme/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/theme/const/array/size';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { SlotInputStateOptions } from '$stylist/input/interface/slot/input-state-options';

export function createInputTextState(
	props: SlotInputStateOptions & {
		id?: string;
		helperText?: string;
		showHelperWhenError?: boolean;
		value?: string;
		maxlength?: number;
		autoResize?: boolean;
	}
) {
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
	const showHelper = $derived(!!props.helperText && (!!props.showHelperWhenError || !hasError));
	const classes = $derived(
		['input-field__control', typeof props.class === 'string' ? props.class : '']
			.filter(Boolean)
			.join(' ')
	);

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
		}
	};
}

export default createInputTextState;
