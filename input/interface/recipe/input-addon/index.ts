import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { SlotClass } from '$stylist/theme/interface/slot/class';
import type { TokenColorTone } from '$stylist/design-token/type/alias/color-tone';

export interface RecipeInputAddon
	extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'children'>, SlotClass {
	children?: Snippet<[]>;
	position?: 'left' | 'right';
	variant?: TokenColorTone;
}
