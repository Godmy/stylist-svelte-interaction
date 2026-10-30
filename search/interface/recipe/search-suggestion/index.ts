import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlDiv } from '$stylist/html/interface/recipe/div';
import type { SlotSearchSuggestion } from '$stylist/search/interface/slot/search-suggestion';
import type { SlotSearchSkin } from '$stylist/search/interface/slot/search-skin';

/** Typeahead suggestion list (`<ul>` of buttons) with loading and empty states. */
export interface RecipeSearchSuggestion extends ComputeIntersectAll<
	[Omit<RecipeHtmlDiv, 'children' | 'class'>, SlotSearchSuggestion, SlotSearchSkin]
> {}
