import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/** Shared storage page: the file manager and the selected file details; nothing is uploaded. */
export interface RecipeFileStorage extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlSection, 'children' | 'title'>,
		{
			title?: string;
		}
	]
> {}
