import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';

export interface RecipeAtomicTierCard {
	/** Icon name for the floating badge. */
	icon: string;
	/** Accent tone shared by the icon fill, card border and count. */
	accent?: TokenColorTone;
	/** Tier name, e.g. `"Atoms"`. */
	name: string;
	/** Short description of the tier. */
	description?: string;
	/** Count rendered prominently. */
	count?: number;
	/** Label shown under the count. */
	countLabel?: string;
	/** `animation-delay` forwarded to the floating icon. */
	delay?: string;
	class?: string;
}
