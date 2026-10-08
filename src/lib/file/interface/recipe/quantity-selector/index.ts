import type { HTMLAttributes } from 'svelte/elements';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { TokenSelectorKind } from '$stylist/control/type/alias/selection-kind';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotText } from '$stylist/typography/interface/slot/text';

export interface RecipeQuantitySelector
	extends ComputeIntersectAll<
		[
			HTMLAttributes<HTMLDivElement> & {
				value?: number;
				min?: number;
				max?: number;
				step?: number;
				disabled?: boolean;
				variant?: TokenSelectorKind;
				size?: TokenSize;
				class?: string;
				inputClass?: string;
				buttonClass?: string;
				onValueChange?: (value: number) => void;
				onIncrement?: (value: number) => void;
				onDecrement?: (value: number) => void;
				showInput?: boolean;
				showButtons?: boolean;
				label?: string;
			},
			SlotText,
			BehaviorClickable,
			BehaviorFocusable,
			BehaviorSizable
		]
	> {}
