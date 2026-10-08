import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';

export interface RecipeFloatingIcon {
	/** Icon name from the svg registry. */
	icon: string;
	/** Semantic accent tone driving the gradient fill. */
	accent?: TokenColorTone;
	/** CSS `animation-delay` value, e.g. `"0.1s"`. */
	delay?: string;
	/** Render without the floating animation. */
	still?: boolean;
	class?: string;
}
