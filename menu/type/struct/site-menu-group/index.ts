import type { SiteMenuItem } from '$stylist/menu/type/struct/site-menu-item';

/** Menu section: its name and destinations in their original order. */
export type SiteMenuGroup = { group: string; items: SiteMenuItem[] };
