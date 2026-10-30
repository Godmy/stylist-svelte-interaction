import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlButton } from '$stylist/html/interface/recipe/button';
import type { SlotSearchToggle } from '$stylist/search/interface/slot/search-toggle';

/** Icon `<button>` that discloses a search region; it inherits the skin of its host. */
export interface RecipeSearchToggle extends ComputeIntersectAll<
	[Omit<RecipeHtmlButton, 'children' | 'type' | 'class'>, SlotSearchToggle]
> {}
