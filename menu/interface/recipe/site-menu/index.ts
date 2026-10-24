import type { RecipeHtmlHeader } from '$stylist/html/interface/recipe/header';
import type { BehaviorSiteMenu } from '$stylist/menu/interface/behavior/site-menu';
import type { SlotSiteMenu } from '$stylist/menu/interface/slot/site-menu';

/** Site header with a searchable disclosure menu of grouped destinations. */
export interface RecipeSiteMenu
	extends Omit<RecipeHtmlHeader, 'children'>, BehaviorSiteMenu, SlotSiteMenu {}
