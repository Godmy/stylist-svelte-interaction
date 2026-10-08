export interface SlotMegaMenuLink {
	/** Stable identifier of the link */
	id: string;
	/** Visible link text */
	label: string;
	/** Target URL */
	href: string;
	/** Optional secondary line under the label */
	description?: string;
	/** Optional icon name from the svg icon set */
	icon?: string;
	/** Inline SVG markup used instead of `icon` (e.g. a brand logo) */
	iconSvg?: string;
	/** CSS background of the icon tile, e.g. a brand colour */
	iconBackground?: string;
	/** CSS colour of the icon glyph */
	iconColor?: string;
	/** Optional short badge, e.g. «Новое» or «ТОП» */
	badge?: string;
	/** Marks the link as the current page */
	active?: boolean;
	/** Opens the link in a new tab */
	external?: boolean;
}
