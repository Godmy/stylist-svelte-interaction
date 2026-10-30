import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlInputSearch } from '$stylist/html/interface/recipe/input-search';
import type { SlotAutoComplete } from '$stylist/search/interface/slot/auto-complete';
import type { SlotSearchSkin } from '$stylist/search/interface/slot/search-skin';

/** Combobox: a search field with a listbox; native attributes reach the control. */
export interface RecipeAutoComplete extends ComputeIntersectAll<
	[Omit<RecipeHtmlInputSearch, 'value' | 'class'>, SlotAutoComplete, SlotSearchSkin]
> {}
