import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSelectable } from '$stylist/control/interface/behavior/selectable';
import type { BehaviorScrollable } from '$stylist/layout/interface/behavior/scrollable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotComboboxItem } from '$stylist/control/interface/slot/combobox-item';
export interface RecipeCombobox
	extends ComputeIntersectAll<
		[
			SlotChildren,
			SlotText,
			SlotText,
			SlotIcon,
			BehaviorSelectable<string | null>,
			BehaviorFocusable,
			BehaviorSizable,
			BehaviorScrollable
		]
	> {
	id: string;
	items: SlotComboboxItem[];
	value?: string | null;
	label?: string;
	description?: string;
	placeholder?: string;
	emptyText?: string;
	disabled?: boolean;
	clearable?: boolean;
	loading?: boolean;
	class?: string;
}
