import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/** Rating card with an editable question, tone switch and the last submitted score. */
export interface RecipeFeedbackScenario extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlSection, 'children' | 'title'>,
		{
			title?: string;
		}
	]
> {}
