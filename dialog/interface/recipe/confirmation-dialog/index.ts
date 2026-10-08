import type { SlotConfirmationDialog } from '$stylist/dialog/interface/slot/confirmation-dialog';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
export interface RecipeConfirmationDialog
	extends ComputeIntersectAll<
		[
			SlotConfirmationDialog,
			SlotConfirmationDialog,
			SlotText,
			SlotText,
			SlotIcon,
			BehaviorClickable,
			BehaviorFocusable,
			BehaviorSizable
		]
	> {}
