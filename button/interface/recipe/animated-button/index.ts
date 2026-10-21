import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
export interface RecipeAnimatedButton
	extends
		Omit<HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, 'children' | 'onclick'>,
		Pick<
			HTMLButtonAttributes,
			| 'type'
			| 'disabled'
			| 'name'
			| 'value'
			| 'form'
			| 'formaction'
			| 'formenctype'
			| 'formmethod'
			| 'formnovalidate'
			| 'formtarget'
		> {
	onclick?: (
		event: MouseEvent & { currentTarget: EventTarget & (HTMLButtonElement | HTMLAnchorElement) }
	) => void;
	children?: Snippet;
	href?: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
	rel?: string;
	effect?: 'shine' | 'glow' | 'fill' | 'arrow' | 'selection' | 'morph';
	loading?: boolean;
	/** Run the shine effect automatically, with a pause between passes. */
	attention?: boolean;
	/** Continuously move two highlights around the rounded border. */
	animatedBorder?: boolean;
	selected?: boolean;
	block?: boolean;
}
