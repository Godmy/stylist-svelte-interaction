import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotSearchSuggestion } from '$stylist/search/interface/slot/search-suggestion';
export interface RecipeSearchSuggestion
	extends ComputeIntersectAll<
		[SlotSearchSuggestion, SlotText, SlotIcon, BehaviorClickable, BehaviorFocusable, BehaviorSizable]
	> {}
