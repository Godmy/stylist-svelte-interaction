import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlSearch } from '$stylist/html/interface/recipe/search';
import type { SlotSearchBar } from '$stylist/search/interface/slot/search-bar';
import type { SlotSearchSkin } from '$stylist/search/interface/slot/search-skin';

/** Live `<search>` region: field, clear and submit buttons, debounced `onSearch`. */
export interface RecipeSearchBar extends ComputeIntersectAll<
	[Omit<RecipeHtmlSearch, 'children' | 'class'>, SlotSearchBar, SlotSearchSkin]
> {}
