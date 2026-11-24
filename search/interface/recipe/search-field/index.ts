import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlInputSearch } from '$stylist/html/interface/recipe/input-search';
import type { SlotSearchSkin } from '$stylist/search/interface/slot/search-skin';

/** `<input type="search">` with a leading icon; native attributes reach the control. */
export interface RecipeSearchField extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlInputSearch, 'value' | 'class'>,
		{
			/** Query text (`bind:value`). */
			value?: string;
			/** Class of the wrapper; the native control takes `inputClass`. */
			class?: string;
			inputClass?: string;
			/**
			 * Shows the leading search icon.
			 * @default true
			 */
			icon?: boolean;
			/** Called with the query on every input and when Escape clears it. */
			onValueInput?: (value: string) => void;
			/** Called after Escape cleared a non-empty query. */
			onClear?: () => void;
			/** Called on every Escape, after the query is cleared. */
			onEscape?: () => void;
		},
		SlotSearchSkin
	]
> {}
