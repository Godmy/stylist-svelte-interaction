import type { RecipeAnimatedButton } from '$stylist/button/interface/recipe/animated-button';
/** AnimatedButton with the `shine` effect fixed. */
export interface RecipeShineButton extends Omit<RecipeAnimatedButton, 'effect'> {}
