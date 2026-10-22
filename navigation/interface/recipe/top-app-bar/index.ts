import type { Snippet } from 'svelte';
import type { RecipeHtmlHeader } from '$stylist/html/interface/recipe/header';

/** Top app bar: navigation icon on the left, title, action buttons on the right. */
export interface RecipeTopAppBar extends Omit<RecipeHtmlHeader, 'children'> {
	heading?: string;
	subheading?: string;
	/** `menu` opens the drawer (burger), `up` goes back, `none` hides the icon. */
	navigation?: 'menu' | 'up' | 'none';
	/** Burger state: the drawer is open. */
	menuOpen?: boolean;
	onNavigation?: () => void;
	/** Accessible label of the navigation icon. */
	navigationLabel?: string;
	/** Raised look, e.g. when the fragment is scrolled. */
	elevated?: boolean;
	/** Replaces the navigation icon. */
	leading?: Snippet;
	/** Action buttons on the right. */
	actions?: Snippet;
}
