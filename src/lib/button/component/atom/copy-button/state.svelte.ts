import type { HTMLButtonAttributes } from 'svelte/elements';
import type { RecipeCopyButton } from '$stylist/button/interface/recipe/copy-button';
import { copyTextToClipboard } from '$stylist/button/function/async/copy-text-to-clipboard';
import { createButtonPreset } from '$stylist/button/function/script/create-button-preset';
import { resolveAriaLabel } from '$stylist/theme/function/resolve/aria-label';

export function createCopyButtonState(getProps: () => RecipeCopyButton & HTMLButtonAttributes) {
	const props = $derived(getProps());
	const preset = createButtonPreset({
		variant: 'outline',
		size: 'sm'
	});

	const variant = $derived((props.variant ?? preset.defaults.variant) as string);
	const size = $derived((props.size ?? preset.defaults.size) as string);
	const disabled = $derived(props.disabled ?? preset.defaults.disabled);
	const loading = $derived(props.loading ?? false);

	const classes = $derived('c-copy-button');

	const loaderClasses = $derived('c-copy-button__loader');

	const attrs = $derived({
		'aria-busy': typeof loading === 'boolean' ? loading : undefined,
		'aria-live': typeof loading === 'boolean' && loading ? 'polite' : undefined,
		disabled: typeof disabled === 'boolean' ? disabled : undefined
	});

	const ariaLabel = $derived(
		resolveAriaLabel(
			typeof props.ariaLabel === 'string' ? props.ariaLabel : undefined,
			props as Record<string, unknown>,
			'Copy to clipboard'
		)
	);
	let copied = $state(false);

	const iconClasses = $derived(
		copied ? 'c-copy-button__icon c-copy-button__icon--copied' : 'c-copy-button__icon'
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
		},
		get copied() {
			return copied;
		},
		get iconClasses() {
			return iconClasses;
		},
		async handleCopy() {
			if (props.disabled || props.loading) return;

			const success = await copyTextToClipboard(props.copyText ?? '');

			if (success) {
				copied = true;
				props.onSuccess?.(props.successMessage ?? 'Copied to clipboard');
				setTimeout(() => {
					copied = false;
				}, 2000);
				return;
			}

			props.onError?.(new Error('Failed to copy to clipboard'));
		}
	};
}
