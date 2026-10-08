import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotSearchBar } from '$stylist/search/interface/slot/search-bar';
export interface RecipeSearchBar
	extends ComputeIntersectAll<
		[SlotSearchBar, SlotText, SlotText, SlotIcon, BehaviorFocusable, BehaviorSizable]
	> {}
