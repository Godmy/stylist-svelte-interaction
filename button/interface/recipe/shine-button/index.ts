import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeAnimatedButton } from '$stylist/button/interface/recipe/animated-button';
/** AnimatedButton with the `shine` effect fixed. */
export interface RecipeShineButton extends ComputeIntersectAll<
	[Omit<RecipeAnimatedButton, 'effect'>]
> {}
