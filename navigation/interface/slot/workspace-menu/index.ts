import type { SiteMenuItem } from '$stylist/menu/type/struct/site-menu-item';

/** Grouped destinations of a collapsible side panel and its visible labels. */
export interface SlotWorkspaceMenu {
	items: readonly SiteMenuItem[];
	active?: string;
	/** Collapsed panel shows only the first letter of each destination. */
	compact?: boolean;
	label?: string;
	collapseLabel?: string;
	expandLabel?: string;
	/** Prefix of each destination's accessible name, e.g. `Section: Projects`. */
	itemLabel?: string;
}
