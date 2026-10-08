import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSelectable } from '$stylist/control/interface/behavior/selectable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipeTimeSlot
	extends ComputeIntersectAll<
		[SlotText, SlotText, BehaviorSelectable<string>, BehaviorFocusable, BehaviorSizable]
	> {}
