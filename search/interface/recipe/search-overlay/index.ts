import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlSearch } from '$stylist/html/interface/recipe/search';
import type { SlotSearchOverlay } from '$stylist/search/interface/slot/search-overlay';
import type { SlotSearchSkin } from '$stylist/search/interface/slot/search-skin';

/** `<search>` behind a toggle: the field opens beside it and results drop below. */
export interface RecipeSearchOverlay extends ComputeIntersectAll<
	[Omit<RecipeHtmlSearch, 'children' | 'class' | 'results'>, SlotSearchOverlay, SlotSearchSkin]
> {}
