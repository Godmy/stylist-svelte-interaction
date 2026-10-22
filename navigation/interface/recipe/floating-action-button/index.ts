import type { RecipeHtmlButton } from '$stylist/html/interface/recipe/button';

/** Floating action button: the primary action of a fragment, above the content. */
export interface RecipeFloatingActionButton extends RecipeHtmlButton {
	/** Svg icon name; `plus` by default. */
	icon?: string;
	/** Text of an extended FAB; a round FAB needs `aria-label` instead. */
	label?: string;
	size?: 'sm' | 'md' | 'lg';
}
