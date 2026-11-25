import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeAnimatedButton } from '$stylist/button/interface/recipe/animated-button';
/** AnimatedButton with the `selection` effect fixed; renders an action button only. */
export interface RecipeSelectionButton extends ComputeIntersectAll<
	[Omit<RecipeAnimatedButton, 'effect' | 'href' | 'target' | 'rel'>]
> {}
