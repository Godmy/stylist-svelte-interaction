import type { RecipeFocusable as FocusProps } from '$stylist/button/interface/recipe/focusable';

export function createFocusableState(getProps: () => FocusProps) {
	const props = $derived(getProps());
	let isFocused = $state(false);

	const classes = $derived.by(() => {
		const { focusEffect = true, disabled = false, class: className = '' } = props;

		if (disabled)
			return ['c-focusable', 'c-focusable--disabled', className].filter(Boolean).join(' ');

		return [
			'c-focusable',
			focusEffect && 'c-focusable--focus-ring',
			isFocused && 'c-focusable--focused',
			className
		]
			.filter(Boolean)
			.join(' ');
	});

	const restProps = $derived.by(() => {
		const { class: _class, onFocus, onBlur, disabled, focusEffect, ...rest } = props;
		return rest;
	});

	function handleFocus(event: FocusEvent) {
		if (!props.disabled) {
			isFocused = true;
			props.onFocus?.(event);
		}
	}

	function handleBlur(event: FocusEvent) {
		if (!props.disabled) {
			isFocused = false;
			props.onBlur?.(event);
		}
	}

	return {
		get isFocused() {
			return isFocused;
		},
		get disabled() {
			return props.disabled;
		},
		get classes() {
			return classes;
		},
		get restProps() {
			return restProps;
		},
		handleFocus,
		handleBlur
	};
}
