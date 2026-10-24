import type { SiteMenuItem } from '$stylist/menu/type/struct/site-menu-item';

/** Flat row of destinations: a scrolling strip or a sticky bottom bar. */
export interface SlotSectionBar {
	items: readonly SiteMenuItem[];
	active?: string;
	placement?: 'strip' | 'bottom';
}
