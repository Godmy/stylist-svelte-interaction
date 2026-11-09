import type { Snippet } from 'svelte';
import type { SlotMegaMenuColumn } from '$stylist/menu/interface/slot/mega-menu-column';
import type { SlotMegaMenuFeature } from '$stylist/menu/interface/slot/mega-menu-feature';
import type { SlotMegaMenuLink } from '$stylist/menu/interface/slot/mega-menu-link';

export interface SlotMegaMenuSection {
	/** Stable identifier of the top-level section */
	id: string;
	/** Label of the top-level trigger */
	label: string;
	/** Direct URL; used as a plain link when the section has no columns */
	href?: string;
	/** Marks the section as containing the current page */
	active?: boolean;
	/** Optional lead text shown at the top of the panel */
	intro?: string;
	/** Optional content above the columns (a search field); the feature beside them keeps the full height */
	header?: Snippet;
	/** Optional content in the feature's place (a widget); shown instead of `feature` */
	aside?: Snippet;
	/** Link columns of the panel */
	columns?: SlotMegaMenuColumn[];
	/** Optional promo card shown at the end of the panel */
	feature?: SlotMegaMenuFeature;
	/** Optional links in the panel footer */
	footerLinks?: SlotMegaMenuLink[];
}
