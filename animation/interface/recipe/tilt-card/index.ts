import type { RecipeHtmlDiv } from '$stylist/html/interface/recipe/div';
import type { BehaviorTilt } from '$stylist/animation/interface/behavior/tilt';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/** Perspective card: a stable wrapper measures the pointer while the inner surface tilts. */
export interface RecipeTiltCard extends ComputeIntersectAll<
	[
		RecipeHtmlDiv,
		BehaviorTilt,
		{
			label?: string;
		}
	]
> {}
