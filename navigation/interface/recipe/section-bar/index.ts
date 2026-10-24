import type { RecipeHtmlNav } from '$stylist/html/interface/recipe/nav';
import type { BehaviorSectionSelect } from '$stylist/navigation/interface/behavior/section-select';
import type { SlotSectionBar } from '$stylist/navigation/interface/slot/section-bar';

/** Section strip or bottom bar; name it with `aria-label`. */
export interface RecipeSectionBar
	extends Omit<RecipeHtmlNav, 'children'>, BehaviorSectionSelect, SlotSectionBar {}
