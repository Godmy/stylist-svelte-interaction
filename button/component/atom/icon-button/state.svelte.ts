import { createButtonFactoryInput } from '$stylist/button/function/transform/button-factory-input';

import type { HTMLButtonAttributes } from 'svelte/elements';
import type { RecipeIconButton } from '$stylist/button/interface/recipe/icon-button';
import type { RecipeButtonFactoryInput } from '$stylist/button/interface/recipe/button-factory-input';
import { resolveAriaLabel } from '$stylist/theme/function/resolve/aria-label';
/** Reactive behavior of icon-button; props are read lazily when needed. */
export function createIconButtonState(getProps: () => RecipeIconButton & HTMLButtonAttributes) {
	function createIconButtonState(input: RecipeButtonFactoryInput) {
		const variant = $derived((input.contract.variant ?? 'default') as string);
		const size = $derived((input.contract.size ?? 'md') as string);
		const disabled = $derived((input.contract.disabled ?? false) as boolean);
		const loading = $derived((input.contract.loading ?? false) as boolean);

		const isDisabled = $derived(disabled || loading);

		const ariaLabel = $derived(
			resolveAriaLabel(
				typeof input.contract.ariaLabel === 'string' ? input.contract.ariaLabel : undefined,
				input.contract as Record<string, unknown>,
				''
			)
		);

		const attrs = $derived({
			'aria-busy': loading || undefined,
			'aria-live': loading ? ('polite' as const) : undefined,
			'aria-label': ariaLabel || undefined,
			disabled: isDisabled || undefined
		});

		const iconSizeMap: Record<string, number> = {
			xs: 14,
			sm: 18,
			md: 20,
			lg: 24,
			xl: 26
		};

		const iconSize = $derived(iconSizeMap[size] ?? 16);

		return {
			get variant(): typeof variant {
				return variant;
			},
			get size(): typeof size {
				return size;
			},
			get disabled(): typeof disabled {
				return disabled;
			},
			get loading(): typeof loading {
				return loading;
			},
			get isDisabled(): typeof isDisabled {
				return isDisabled;
			},
			get ariaLabel(): typeof ariaLabel {
				return ariaLabel;
			},
			get attrs(): typeof attrs {
				return attrs;
			},
			get iconSize(): typeof iconSize {
				return iconSize;
			}
		};
	}
	const props = $derived(getProps());
	const Loader2 = 'loader-2';
	const factoryInput = $derived(createButtonFactoryInput(props));
	const state = $derived(createIconButtonState(factoryInput));
	const restProps = $derived.by(() => {
		const {
			variant: _variant,
			size: _size,
			disabled: _disabled,
			loading: _loading,
			block: _block,
			loadingLabel: _loadingLabel,
			children: _children,
			icon: _icon,
			class: _class,
			...rest
		} = props;
		return rest;
	});
	return {
		get Loader2(): typeof Loader2 {
			return Loader2;
		},
		get viewState(): typeof state {
			return state;
		},
		get restProps(): typeof restProps {
			return restProps;
		}
	};
}
export default createIconButtonState;
