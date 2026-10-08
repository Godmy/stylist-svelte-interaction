export interface RecipeBeachWater {
	/** Legacy water tint. Used as the back layer when layer colors are not provided. */
	tone?: string;
	/** Back wave layer color. */
	backColor?: string;
	/** Middle wave layer color. */
	middleColor?: string;
	/** Front wave layer color. */
	frontColor?: string;
	/** Fraction of the SVG height where the first wave layer starts. */
	waveStart?: number;
	/** Wave height in SVG units. */
	amplitude?: number;
	/** Vertical spacing between wave layers in SVG units. */
	layerOffset?: number;
	/** Render without the lapping animation. */
	still?: boolean;
	class?: string;
}
