import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeAnimatedButton } from '$stylist/button/interface/recipe/animated-button';
/** AnimatedButton with the `arrow` effect fixed. */
export interface RecipeArrowButton extends ComputeIntersectAll<
	[Omit<RecipeAnimatedButton, 'effect'>]
> {}
