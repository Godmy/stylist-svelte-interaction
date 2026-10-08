import type { SlotNumberInput } from '$stylist/input/interface/slot/number-input';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { HTMLAttributes } from 'svelte/elements';
export interface RecipeNumberInput
	extends ComputeIntersectAll<
		[
			SlotNumberInput,
			HTMLAttributes<HTMLInputElement>,
			SlotText,
			SlotText,
			SlotIcon,
			BehaviorFocusable,
			Omit<BehaviorSizable, 'size'>
		]
	> {}
