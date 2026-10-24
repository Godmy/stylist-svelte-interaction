import type { RecipeHtmlNav } from '$stylist/html/interface/recipe/nav';
import type { BehaviorSectionSelect } from '$stylist/navigation/interface/behavior/section-select';
import type { SlotWorkspaceMenu } from '$stylist/navigation/interface/slot/workspace-menu';

/** Side panel of grouped, collapsible destinations. */
export interface RecipeWorkspaceMenu
	extends Omit<RecipeHtmlNav, 'children'>, BehaviorSectionSelect, SlotWorkspaceMenu {}
