import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { SlotButtonDom } from '$stylist/button/interface/slot/button-dom';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipePageButton
	extends ComputeIntersectAll<
		[SlotButtonDom, SlotChildren, SlotText, BehaviorClickable, BehaviorFocusable, BehaviorSizable]
	> {
	class?: string;
	page?: number;
	isActive?: boolean;

	[prop: string]: unknown;
}
