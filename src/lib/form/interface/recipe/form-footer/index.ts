import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotFormFooter } from '$stylist/form/interface/slot/form-footer';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
export interface RecipeFormFooter
	extends ComputeIntersectAll<
		[SlotFormFooter, BehaviorClickable, BehaviorFocusable, BehaviorSizable]
	> {}
