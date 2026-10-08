import type { HTMLButtonAttributes } from 'svelte/elements';
import type { RecipePageButton } from '$stylist/navigation/interface/recipe/page-button';
import { createButtonPreset } from '$stylist/button/function/script/create-button-preset';

export function createPageButtonState(
	getProps: () => RecipePageButton &
		HTMLButtonAttributes & {
			isActive?: boolean;
		}
) {
	const props = $derived(getProps());
	const preset = createButtonPreset({
		variant: 'outline',
		size: 'md'
	});

	const isActive = $derived(props.isActive ?? false);
	const actualVariant = $derived(isActive ? 'primary' : (props.variant ?? preset.defaults.variant));
	const actualDisabled = $derived(props.disabled || isActive);
	const loading = $derived(props.loading ?? false);

	const variant = $derived(actualVariant as string);
	const size = $derived((props.size ?? preset.defaults.size) as string);

	const classes = $derived('c-page-button');

	const loaderClasses = $derived('c-page-button__loader');

	const attrs = $derived({
		'aria-busy': typeof loading === 'boolean' ? loading : undefined,
		'aria-live': typeof loading === 'boolean' && loading ? 'polite' : undefined,
		'aria-current': isActive ? 'page' : undefined,
		disabled: typeof actualDisabled === 'boolean' ? actualDisabled : undefined
	});

	return {
		get variant() {
			return variant;
		},
		get size() {
			return size;
		},
		get disabled() {
			return actualDisabled;
		},
		get loading() {
			return loading;
		},
		get isActive() {
			return isActive;
		},
		get classes() {
			return classes;
		},
		get loaderClasses() {
			return loaderClasses;
		},
		get attrs() {
			return attrs;
		}
	};
}
