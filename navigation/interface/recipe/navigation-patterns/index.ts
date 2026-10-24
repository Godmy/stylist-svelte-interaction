import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { SlotNavigationPatterns } from '$stylist/navigation/interface/slot/navigation-patterns';

/** Header, side panel, section strip and bottom bar over the same destinations. */
export interface RecipeNavigationPatterns
	extends Omit<RecipeHtmlSection, 'children' | 'title'>, SlotNavigationPatterns {}
