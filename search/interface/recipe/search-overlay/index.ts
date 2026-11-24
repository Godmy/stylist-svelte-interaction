import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlSearch } from '$stylist/html/interface/recipe/search';
import type { SlotSearchSkin } from '$stylist/search/interface/slot/search-skin';
import type { Snippet } from 'svelte';

/** `<search>` behind a toggle: the field opens beside it and results drop below. */
export interface RecipeSearchOverlay extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlSearch, 'children' | 'class' | 'results'>,
		{
			/** Whether the field is shown (`bind:open`). */
			open?: boolean;
			/** Query text (`bind:query`); cleared when the overlay closes. */
			query?: string;
			placeholder?: string;
			class?: string;
			/** Popup content for a non-empty query; receives the trimmed query. */
			results?: Snippet<[string]>;
			/** Extra actions rendered after the toggle. */
			children?: Snippet;
			onOpenChange?: (open: boolean) => void;
		},
		SlotSearchSkin
	]
> {}
