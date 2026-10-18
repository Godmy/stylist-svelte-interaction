import type { RecipeAnimatedButton } from '$stylist/button/interface/recipe/animated-button';
/** AnimatedButton with the `fill` effect fixed. */
export interface RecipeFillButton extends Omit<RecipeAnimatedButton, 'effect'> {}
