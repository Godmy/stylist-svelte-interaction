import type { RecipeHtmlNav } from '$stylist/html/interface/recipe/nav';
import type { BehaviorSectionSelect } from '$stylist/navigation/interface/behavior/section-select';
import type { SiteMenuItem } from '$stylist/menu/type/struct/site-menu-item';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/** Section strip or bottom bar; name it with `aria-label`. */
export interface RecipeSectionBar extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlNav, 'children'>,
		BehaviorSectionSelect,
		{
			items: readonly SiteMenuItem[];
			active?: string;
			placement?: 'strip' | 'bottom';
		}
	]
> {}
