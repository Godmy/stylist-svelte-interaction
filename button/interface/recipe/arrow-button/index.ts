import type { RecipeAnimatedButton } from '$stylist/button/interface/recipe/animated-button';
/** AnimatedButton with the `arrow` effect fixed. */
export interface RecipeArrowButton extends Omit<RecipeAnimatedButton, 'effect'> {}
