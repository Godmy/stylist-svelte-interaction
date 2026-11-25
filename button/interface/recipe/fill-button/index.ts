import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeAnimatedButton } from '$stylist/button/interface/recipe/animated-button';
/** AnimatedButton with the `fill` effect fixed. */
export interface RecipeFillButton extends ComputeIntersectAll<
	[Omit<RecipeAnimatedButton, 'effect'>]
> {}
