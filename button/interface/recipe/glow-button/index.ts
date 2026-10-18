import type { RecipeAnimatedButton } from '$stylist/button/interface/recipe/animated-button';
/** AnimatedButton with the `glow` effect fixed. */
export interface RecipeGlowButton extends Omit<RecipeAnimatedButton, 'effect'> {}
