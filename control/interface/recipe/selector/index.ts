import type { HTMLAttributes, HTMLSelectAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSelectable } from '$stylist/control/interface/behavior/selectable';
import type { BehaviorScrollable } from '$stylist/layout/interface/behavior/scrollable';
import type { BehaviorShapeable } from '$stylist/layout/interface/behavior/shapeable';
import type { BehaviorSized } from '$stylist/layout/interface/behavior/sized';
import type { BehaviorSpaced } from '$stylist/layout/interface/behavior/spaced';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { SlotText } from '$stylist/typography/interface/slot/text';

export interface RecipeSelector
	extends ComputeIntersectAll<
		[
			(HTMLSelectAttributes & {
				id: string;
				label: string;
				value?: string;
				options: {
					value: string;
					label: string;
				}[];
				errors?: string[];
				required?: boolean;
				disabled?: boolean;
				placeholder?: string;
				class?: string;
			}) & {
				open?: boolean;
				onToggle?: () => void;
			},
			SlotText,
			SlotText,
			SlotIcon,
			BehaviorSelectable<string | string[]>,
			BehaviorFocusable,
			BehaviorSized,
			BehaviorShapeable,
			BehaviorSpaced,
			BehaviorScrollable,
			SlotTheme,
			HTMLAttributes<HTMLSelectElement>
		]
	> {}
