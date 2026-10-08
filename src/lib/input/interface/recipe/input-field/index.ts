import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { HTMLAttributes } from 'svelte/elements';
import type { SlotInputBase } from '$stylist/input/interface/slot/input-base';

export interface RecipeInputField
	extends ComputeIntersectAll<
		[
			SlotInputBase,
			HTMLAttributes<HTMLInputElement>,
			{
				required?: boolean;
				requiredLabel?: string;
			},
			{
				label?: string;
				helperText?: string;
				error?: boolean;
				errorMessage?: string;
			},
			{
				helperText?: string;
			},
			SlotText,
			SlotIcon,
			BehaviorFocusable,
			BehaviorSizable
		]
	> {}
