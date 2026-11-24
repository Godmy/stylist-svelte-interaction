import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/** Shared counter with a rate limit; nothing is synchronized with a server. */
export interface RecipeSupportCounter extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlSection, 'children' | 'title'>,
		{
			title?: string;
		}
	]
> {}
