import type { SlotNumberInput } from '$stylist/input/interface/slot/number-input';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
export interface RecipeNumberInput
	extends SlotNumberInput, SlotText, SlotIcon, BehaviorFocusable, Omit<BehaviorSizable, 'size'> {}
