import type { TokenIconName } from '$stylist/svg/type/alias/icon-name';
import type { RecipeHtmlButton } from '$stylist/html/interface/recipe/button';

/** Floating action button: the primary action of a fragment, above the content. */
export interface RecipeFloatingActionButton extends RecipeHtmlButton {
	/** Svg icon name; `add` by default. */
	icon?: TokenIconName;
	/** Text of an extended FAB; a round FAB needs `aria-label` instead. */
	label?: string;
	size?: 'sm' | 'md' | 'lg';
}
