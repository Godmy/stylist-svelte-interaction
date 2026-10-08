import type { HTMLAnchorAttributes } from 'svelte/elements';
import type { SlotMegaMenuLink } from '$stylist/menu/interface/slot/mega-menu-link';

export interface RecipeMegaMenuLink
	extends Omit<HTMLAnchorAttributes, 'href' | 'children'>,
		Omit<SlotMegaMenuLink, 'id'> {
	/** Compact rendering without description */
	compact?: boolean;
	/** Only the icon is shown; the label becomes the accessible name and tooltip */
	iconOnly?: boolean;
	/** Additional CSS classes */
	class?: string;
	/** Fired when the link is activated */
	onNavigate?: (event: MouseEvent) => void;
}
