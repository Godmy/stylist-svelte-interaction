import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipeInteractionForms
	extends ComputeIntersectAll<[SlotText, BehaviorFocusable, BehaviorSizable]> {}
