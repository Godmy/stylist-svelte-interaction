import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeAnimatedButton } from '$stylist/button/interface/recipe/animated-button';
/** AnimatedButton with the `glow` effect fixed. */
export interface RecipeGlowButton extends ComputeIntersectAll<
	[Omit<RecipeAnimatedButton, 'effect'>]
> {}
