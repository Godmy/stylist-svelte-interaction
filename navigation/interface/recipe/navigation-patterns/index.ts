import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { SiteMenuItem } from '$stylist/menu/type/struct/site-menu-item';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/** Header, side panel, section strip and bottom bar over the same destinations. */
export interface RecipeNavigationPatterns extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlSection, 'children' | 'title'>,
		{
			title?: string;
			items: readonly SiteMenuItem[];
			brand?: string;
			/** Materials per page of the search results. */
			pageSize?: number;
		}
	]
> {}
