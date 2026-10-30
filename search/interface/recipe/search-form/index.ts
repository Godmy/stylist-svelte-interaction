import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlForm } from '$stylist/html/interface/recipe/form';
import type { SlotSearchForm } from '$stylist/search/interface/slot/search-form';
import type { SlotSearchSkin } from '$stylist/search/interface/slot/search-skin';

/** `<search><form>` submitting one named query; form attributes reach `<form>`. */
export interface RecipeSearchForm extends ComputeIntersectAll<
	[Omit<RecipeHtmlForm, 'children' | 'class' | 'name'>, SlotSearchForm, SlotSearchSkin]
> {}
