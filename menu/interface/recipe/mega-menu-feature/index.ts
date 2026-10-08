import type { HTMLAnchorAttributes } from 'svelte/elements';
import type { SlotMegaMenuFeature } from '$stylist/menu/interface/slot/mega-menu-feature';

export interface RecipeMegaMenuFeature
	extends Omit<HTMLAnchorAttributes, 'href' | 'title' | 'children'>,
		SlotMegaMenuFeature {
	/** Additional CSS classes */
	class?: string;
	/** Fired when the card is activated */
	onNavigate?: (event: MouseEvent) => void;
}
