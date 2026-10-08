export interface RecipeTurtleLogoMark {
	/** Shell tint (gradient base). */
	tone?: string;
	/** Head/flipper tint. */
	accent?: string;
	class?: string;
	/** Per-part opacity, 0-1, each defaults to 1 (fully shown). Lets a consumer
	 * (e.g. the turtle-hero-morph sequence) stagger which parts of the mark
	 * are visible, without duplicating this SVG's path data elsewhere. */
	shellOpacity?: number;
	spiralOpacity?: number;
	headOpacity?: number;
	frontLeftFlipperOpacity?: number;
	frontRightFlipperOpacity?: number;
	rearFlippersOpacity?: number;
}
