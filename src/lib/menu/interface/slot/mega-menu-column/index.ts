import type { SlotMegaMenuLink } from '$stylist/menu/interface/slot/mega-menu-link';

export interface SlotMegaMenuColumn {
	/** Stable identifier of the column */
	id: string;
	/** Column heading */
	title: string;
	/** Links listed in the column */
	links: SlotMegaMenuLink[];
	/** Optional row of icon-only links under the list (label → accessible name) */
	iconLinks?: SlotMegaMenuLink[];
	/** Optional trailing "see all" link */
	moreLink?: SlotMegaMenuLink;
}
