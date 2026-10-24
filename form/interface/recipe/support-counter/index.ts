import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { SlotSupportCounter } from '$stylist/form/interface/slot/support-counter';

/** Shared counter with a rate limit; nothing is synchronized with a server. */
export interface RecipeSupportCounter
	extends Omit<RecipeHtmlSection, 'children' | 'title'>, SlotSupportCounter {}
