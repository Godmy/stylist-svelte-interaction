import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlDiv } from '$stylist/html/interface/recipe/div';
import type { SlotSearchResults } from '$stylist/search/interface/slot/search-results';
import type { SlotSearchSkin } from '$stylist/search/interface/slot/search-skin';

/** Result list (`<ul>` of buttons) with loading and empty states. */
export interface RecipeSearchResults extends ComputeIntersectAll<
	[Omit<RecipeHtmlDiv, 'children' | 'class' | 'results'>, SlotSearchResults, SlotSearchSkin]
> {}
