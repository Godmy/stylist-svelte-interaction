import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { TOKEN_ALIGNMENT } from '$stylist/layout/const/array/alignment';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeDrawer extends ComputeIntersectAll<
	[
		HTMLAttributes<HTMLDivElement> & {
			open?: boolean;
			position?: (typeof TOKEN_ALIGNMENT)[number];
			size?: string;
			closable?: boolean;
			showBackdrop?: boolean;
			/** Called on Escape, backdrop click or the close button; without it `open` is reset (bind:open). */
			onClose?: () => void;
			/** Accessible label of the close button; defaults to «Close drawer». */
			closeLabel?: string;
			class?: string;
			header?: Snippet;
			actions?: Snippet;
			children?: Snippet;
		}
	]
> {}
