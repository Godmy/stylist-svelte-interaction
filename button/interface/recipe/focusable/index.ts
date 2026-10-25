import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { SlotClass } from '$stylist/theme/interface/slot/class';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeFocusable extends ComputeIntersectAll<
	[SlotClass, BehaviorFocusable, SlotChildren]
> {}
