import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSelectable } from '$stylist/control/interface/behavior/selectable';
import type { BehaviorScrollable } from '$stylist/layout/interface/behavior/scrollable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotAutoSearch } from '$stylist/search/interface/slot/auto-search';
export interface RecipeAutoSearch
	extends ComputeIntersectAll<
		[
			SlotAutoSearch,
			SlotText,
			SlotText,
			SlotIcon,
			BehaviorSelectable<string>,
			BehaviorFocusable,
			BehaviorSizable,
			BehaviorScrollable
		]
	> {}
