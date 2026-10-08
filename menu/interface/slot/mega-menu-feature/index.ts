export interface SlotMegaMenuFeature {
	/** Small caption above the title */
	eyebrow?: string;
	/** Feature card heading */
	title: string;
	/** Feature card body text */
	text?: string;
	/** Target URL of the call to action */
	href: string;
	/** Call-to-action label */
	ctaLabel?: string;
	/** Optional background image URL */
	image?: string;
	/** Optional alt text for the image */
	imageAlt?: string;
	/** Optional icon shown when there is no image */
	icon?: string;
}
