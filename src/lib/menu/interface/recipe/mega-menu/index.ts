import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { SlotMegaMenuSection } from '$stylist/menu/interface/slot/mega-menu-section';

export interface RecipeMegaMenu extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
	/** Top-level sections; sections without columns render as plain links */
	sections: SlotMegaMenuSection[];
	/** Accessible name of the navigation landmark */
	ariaLabel?: string;
	/** Open panels on mouse hover (click and keyboard always work) */
	openOnHover?: boolean;
	/** Hide link descriptions inside panels */
	compact?: boolean;
	/** Id of the initially open section (useful for demos) */
	defaultOpenId?: string;
	/** Additional CSS classes */
	class?: string;
	/** Optional content rendered before the triggers (logo) */
	leading?: Snippet;
	/** Optional content rendered after the triggers (actions) */
	trailing?: Snippet;
	/** Fired whenever the open section changes (null when closed) */
	onOpenChange?: (sectionId: string | null) => void;
	/** Fired when any link inside the menu is activated */
	onNavigate?: (event: MouseEvent) => void;
}
