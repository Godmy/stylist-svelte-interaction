import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlButton } from '$stylist/html/interface/recipe/button';

/** Icon `<button>` that discloses a search region; it inherits the skin of its host. */
export interface RecipeSearchToggle extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlButton, 'children' | 'type' | 'class'>,
		{
			/** Whether the controlled search region is shown (`aria-expanded`). */
			open?: boolean;
			onToggle?: () => void;
			/** @default 'Open search' */
			openLabel?: string;
			/** @default 'Close search' */
			closeLabel?: string;
			class?: string;
		}
	]
> {}
