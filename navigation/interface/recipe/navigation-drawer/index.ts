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
	/**
	 * Labelled sections become an accordion with one section open — the one holding the
	 * active destination at first — so a long drawer fits without scrolling.
	 */
	accordion?: boolean;
	/** Keep every accordion section open until this option is disabled. */
	expandAll?: boolean;
	/**
	 * Label of the accordion section to open, e.g. the nested graph of the current
	 * fragment when that fragment is not a drawer item itself (a detail screen).
	 */
	openSection?: string;
	/** Accessible name of the drawer navigation. */
	label?: string;
	header?: Snippet;
	footer?: Snippet;
}
