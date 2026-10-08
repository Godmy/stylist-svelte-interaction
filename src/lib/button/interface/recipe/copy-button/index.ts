import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { SlotButtonDom } from '$stylist/button/interface/slot/button-dom';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotText } from '$stylist/typography/interface/slot/text';
export interface RecipeCopyButton
	extends ComputeIntersectAll<
		[
			SlotButtonDom,
			SlotChildren,
			SlotText,
			SlotIcon,
			BehaviorClickable,
			BehaviorFocusable,
			BehaviorSizable
		]
	> {
	class?: string;
	copyText?: string;
	successMessage?: string;
	showIcon?: boolean;
	onSuccess?: (text: string) => void;
	onError?: (error: Error) => void;

	[prop: string]: unknown;
}
