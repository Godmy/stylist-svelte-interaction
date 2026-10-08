import type { HTMLAttributes } from 'svelte/elements';
import type { SlotClass } from '$stylist/theme/interface/slot/class';
import type { ContentList } from '$stylist/theme/interface/slot/content-list';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
export interface RecipeInputHelper<T extends HTMLElement = HTMLElement>
	extends ComputeIntersectAll<[Omit<HTMLAttributes<T>, 'class'>, SlotClass, ContentList]> {
	text?: string;
	variant?: TokenColorTone;
}
