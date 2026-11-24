import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorScrollable } from '$stylist/layout/interface/behavior/scrollable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotAutocompleteDropdownOption } from '$stylist/control/interface/slot/autocomplete-dropdown-option';

export interface RecipeAutocompleteDropdown extends ComputeIntersectAll<
	[
		{
			options: SlotAutocompleteDropdownOption[];
			value?: string;
			placeholder?: string;
			onValueInput?: (value: string) => void;
			onValueChange?: (value: string) => void;
			onChange?: (value: string) => void;
			class?: string;
		},
		SlotText,
		SlotText,
		SlotIcon,
		BehaviorFocusable,
		BehaviorSizable,
		BehaviorScrollable
	]
> {}
