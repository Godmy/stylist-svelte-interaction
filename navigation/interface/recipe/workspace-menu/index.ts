import type { RecipeHtmlNav } from '$stylist/html/interface/recipe/nav';
import type { BehaviorSectionSelect } from '$stylist/navigation/interface/behavior/section-select';
import type { SiteMenuItem } from '$stylist/menu/type/struct/site-menu-item';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/** Side panel of grouped, collapsible destinations. */
export interface RecipeWorkspaceMenu extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlNav, 'children'>,
		BehaviorSectionSelect,
		{
			items: readonly SiteMenuItem[];
			active?: string;
			/** Collapsed panel shows only the first letter of each destination. */
			compact?: boolean;
			label?: string;
			collapseLabel?: string;
			expandLabel?: string;
			/** Prefix of each destination's accessible name, e.g. `Section: Projects`. */
			itemLabel?: string;
		}
	]
> {}
