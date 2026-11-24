import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { RecipeHtmlInputTel } from '$stylist/html/interface/recipe/input-tel';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/**
 * PhoneNumberInput types and interfaces following SOLID principles
 */
export interface RecipePhoneNumberInput extends ComputeIntersectAll<
	[
		RecipeHtmlInputTel,
		{
			value?: string;
			placeholder?: string;
			disabled?: boolean;
			required?: boolean;
			error?: boolean;
			helpText?: string;
			onValueInput?: (value: string, event: Event) => void;
			onValueChange?: (value: string) => void;
			onInput?: (event: Event) => void;
		},
		SlotText,
		SlotIcon,
		BehaviorFocusable,
		Omit<BehaviorSizable, 'size'>
	]
> {}
