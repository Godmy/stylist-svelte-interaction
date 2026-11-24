import type { RecipeHtmlHeader } from '$stylist/html/interface/recipe/header';
import type { BehaviorSiteMenu } from '$stylist/menu/interface/behavior/site-menu';
import type { SiteMenuItem } from '$stylist/menu/type/struct/site-menu-item';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/** Site header with a searchable disclosure menu of grouped destinations. */
export interface RecipeSiteMenu extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlHeader, 'children'>,
		BehaviorSiteMenu,
		{
			items: readonly SiteMenuItem[];
			active?: string;
			/** `mega` shows groups in columns with descriptions; `dropup` opens above the bar. */
			variant?: 'mega' | 'dropdown' | 'dropup';
			brand?: string;
			toggleLabel?: string;
			searchLabel?: string;
			emptyLabel?: string;
		}
	]
> {}
