import type { HTMLAttributes } from 'svelte/elements';
import type { SlotMultiSelectOption } from '$stylist/control/interface/slot/multi-select-option';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSelectable } from '$stylist/control/interface/behavior/selectable';
import type { BehaviorScrollable } from '$stylist/layout/interface/behavior/scrollable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotText } from '$stylist/typography/interface/slot/text';

export interface RecipeMultiSelect
	extends ComputeIntersectAll<
		[
			HTMLAttributes<HTMLDivElement> & {
				options: SlotMultiSelectOption[];
				value?: string[];
				placeholder?: string;
				disabled?: boolean;
				searchable?: boolean;
				maxSelections?: number;
				class?: string;
				dropdownClass?: string;
				selectedClass?: string;
				optionClass?: string;
				placeholderClass?: string;
				searchInputClass?: string;
				onInput?: (value: string[]) => void;
				onChange?: (value: string[]) => void;
			},
			SlotText,
			SlotText,
			SlotIcon,
			BehaviorSelectable<string[]>,
			BehaviorFocusable,
			BehaviorSizable,
			BehaviorScrollable
		]
	> {}
