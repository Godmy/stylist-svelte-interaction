import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { SlotClass } from '$stylist/theme/interface/slot/class';
import type { TokenAlignment } from '$stylist/layout/type/alias/alignment';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeInputAddon
	extends ComputeIntersectAll<
		[
			(Omit<HTMLAttributes<HTMLDivElement>, 'class'> &
				SlotClass & {
					children?: Snippet<[]>;
				}) & {
				position?: TokenAlignment;
				variant?: TokenColorTone;
			},
			{ position?: 'left' | 'right' }
		]
	> {}
