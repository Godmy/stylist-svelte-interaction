import type { SiteMenuItem } from '$stylist/menu/type/struct/site-menu-item';

/** Destinations, the current one, popover layout and visible labels. */
export interface SlotSiteMenu {
	items: readonly SiteMenuItem[];
	active?: string;
	/** `mega` shows groups in columns with descriptions; `dropup` opens above the bar. */
	variant?: 'mega' | 'dropdown' | 'dropup';
	brand?: string;
	toggleLabel?: string;
	searchLabel?: string;
	emptyLabel?: string;
}
