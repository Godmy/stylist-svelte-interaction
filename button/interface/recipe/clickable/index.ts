import type { HTMLAttributes } from 'svelte/elements';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { TokenColorTone } from '$stylist/design-token/type/alias/color-tone';

export interface RecipeClickable extends ComputeIntersectAll<
	[BehaviorClickable, SlotChildren, HTMLAttributes<HTMLDivElement>]
> {
	variant?: TokenColorTone;
	class?: string;
}
