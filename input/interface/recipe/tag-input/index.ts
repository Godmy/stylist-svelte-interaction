import type { SlotTagInput } from '$stylist/input/interface/slot/tag-input';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSelectable } from '$stylist/control/interface/behavior/selectable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipeTagInput
	extends
		SlotTagInput,
		SlotText,
		Omit<BehaviorSelectable<string[]>, 'onChange'>,
		BehaviorFocusable,
		BehaviorSizable {}
