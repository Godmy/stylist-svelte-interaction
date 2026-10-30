import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlInputSearch } from '$stylist/html/interface/recipe/input-search';
import type { SlotSearchField } from '$stylist/search/interface/slot/search-field';
import type { SlotSearchSkin } from '$stylist/search/interface/slot/search-skin';

/** `<input type="search">` with a leading icon; native attributes reach the control. */
export interface RecipeSearchField extends ComputeIntersectAll<
	[Omit<RecipeHtmlInputSearch, 'value' | 'class'>, SlotSearchField, SlotSearchSkin]
> {}
