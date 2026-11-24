import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { RecipeHtmlInputNumber } from '$stylist/html/interface/recipe/input-number';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeNumberInput extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlInputNumber, 'value' | 'min' | 'max' | 'step'>,
		{
			value?: number;
			min?: number;
			max?: number;
			step?: number;
			disabled?: boolean;
			readonly?: boolean;
			class?: string;
			inputClass?: string;
			buttonClass?: string;
			buttonWrapperClass?: string;
			onValueInput?: (value: number) => void;
			onValueChange?: (value: number) => void;
			/** @deprecated use onValueChange */
			onChange?: (value: number) => void;
		},
		SlotText,
		SlotIcon,
		BehaviorFocusable,
		Omit<BehaviorSizable, 'size'>
	]
> {}
