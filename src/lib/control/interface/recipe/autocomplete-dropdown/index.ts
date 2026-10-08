import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorScrollable } from '$stylist/layout/interface/behavior/scrollable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotAutocompleteDropdown } from '$stylist/control/interface/slot/autocomplete-dropdown';

export interface RecipeAutocompleteDropdown
	extends ComputeIntersectAll<
		[
			SlotAutocompleteDropdown,
			SlotText,
			SlotText,
			SlotIcon,
			BehaviorFocusable,
			BehaviorSizable,
			BehaviorScrollable
		]
	> {}
