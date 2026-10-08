import type { HTMLButtonAttributes } from 'svelte/elements';
import type { RecipeCloseButton } from '$stylist/button/interface/recipe/close-button';
import { createButtonPreset } from '$stylist/button/function/script/create-button-preset';
import { resolveAriaLabel } from '$stylist/theme/function/resolve/aria-label';

export function createCloseButtonState(getProps: () => RecipeCloseButton & HTMLButtonAttributes) {
	const props = $derived(getProps());
	const preset = createButtonPreset({
		variant: 'ghost',
		size: 'sm'
	});

	const variant = $derived((props.variant ?? preset.defaults.variant) as string);
	const size = $derived((props.size ?? preset.defaults.size) as string);
	const disabled = $derived(props.disabled ?? preset.defaults.disabled);
	const loading = $derived(props.loading ?? false);

	const classes = $derived('c-close-button');

	const loaderClasses = $derived('c-close-button__loader');

	const ariaLabel = $derived(
		resolveAriaLabel(
			typeof props.ariaLabel === 'string' ? props.ariaLabel : undefined,
			props as Record<string, unknown>,
			'Close'
		)
	);

	const attrs = $derived({
		'aria-busy': typeof loading === 'boolean' ? loading : undefined,
		'aria-live': typeof loading === 'boolean' && loading ? 'polite' : undefined,
		disabled: typeof disabled === 'boolean' ? disabled : undefined
	});

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
		get loading() {
			return loading;
		},
		get classes() {
			return classes;
		},
		get loaderClasses() {
			return loaderClasses;
		},
		get attrs() {
			return attrs;
		},
		get ariaLabel() {
			return ariaLabel;
		}
	};
}
