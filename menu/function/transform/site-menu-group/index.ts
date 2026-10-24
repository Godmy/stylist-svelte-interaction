import type { SiteMenuGroup } from '$stylist/menu/type/struct/site-menu-group';
import type { SiteMenuItem } from '$stylist/menu/type/struct/site-menu-item';

/** Sections in order of their first destination; destinations keep their order inside a section. */
export function siteMenuGroup(items: readonly SiteMenuItem[]): SiteMenuGroup[] {
	const groups = new Map<string, SiteMenuItem[]>();
	for (const item of items) groups.set(item.group, [...(groups.get(item.group) ?? []), item]);
	return [...groups].map(([group, entries]) => ({ group, items: entries }));
}
