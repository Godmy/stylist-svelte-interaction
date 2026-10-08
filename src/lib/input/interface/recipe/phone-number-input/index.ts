import type { SlotPhoneNumberInput } from '$stylist/input/interface/slot/phone-number-input';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
export interface RecipePhoneNumberInput
	extends ComputeIntersectAll<
		[SlotPhoneNumberInput, SlotText, SlotIcon, BehaviorFocusable, Omit<BehaviorSizable, 'size'>]
	> {}
