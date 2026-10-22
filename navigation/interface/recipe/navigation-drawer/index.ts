import type { Snippet } from 'svelte';
import type { RecipeHtmlAside } from '$stylist/html/interface/recipe/aside';
import type { ContractNavigationDrawerSection } from '$stylist/navigation/interface/contract/navigation-drawer-section';

/** Navigation drawer: modal over the content on narrow screens, permanent on wide ones. */
export interface RecipeNavigationDrawer extends Omit<RecipeHtmlAside, 'children'> {
	sections: ContractNavigationDrawerSection[];
	/** `modal` slides over a scrim, `permanent` stays beside the content. */
	mode?: 'modal' | 'permanent';
	open?: boolean;
	isActive?: (id: string) => boolean;
	onSelect?: (id: string) => void;
	/** Escape, scrim click; without it `open` is reset (bind:open). */
	onClose?: () => void;
	/** Accessible name of the drawer navigation. */
	label?: string;
	header?: Snippet;
	footer?: Snippet;
}
