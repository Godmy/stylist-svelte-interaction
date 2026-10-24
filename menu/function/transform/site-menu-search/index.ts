import type { SiteMenuItem } from '$stylist/menu/type/struct/site-menu-item';

/** Destinations whose label contains the trimmed query, ignoring case; an empty query keeps all. */
export function siteMenuSearch(items: readonly SiteMenuItem[], query: string): SiteMenuItem[] {
	const needle = query.trim().toLowerCase();
	return items.filter((item) => item.label.toLowerCase().includes(needle));
}
