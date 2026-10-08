import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeButtonElement } from '$stylist/button/interface/recipe/button-element';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
export interface RecipeCloseButton
	extends ComputeIntersectAll<
		[RecipeButtonElement, SlotIcon, BehaviorClickable, BehaviorFocusable, BehaviorSizable]
	> {}
