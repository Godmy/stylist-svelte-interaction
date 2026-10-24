import type { SiteMenuItem } from '$stylist/menu/type/struct/site-menu-item';

/** One set of destinations shown through several navigation layouts. */
export interface SlotNavigationPatterns {
	title?: string;
	items: readonly SiteMenuItem[];
	brand?: string;
	/** Materials per page of the search results. */
	pageSize?: number;
}
