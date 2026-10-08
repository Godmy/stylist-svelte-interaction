import type { SlotRangeInput } from '$stylist/control/interface/slot/range-input';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSelectable } from '$stylist/control/interface/behavior/selectable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipeRangeInput
	extends ComputeIntersectAll<
		[
			SlotRangeInput,
			SlotRangeInput,
			SlotText,
			SlotText,
			BehaviorSelectable<number>,
			BehaviorFocusable,
			BehaviorSizable
		]
	> {}
