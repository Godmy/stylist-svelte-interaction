import type { HTMLAttributes } from 'svelte/elements';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSelectable } from '$stylist/control/interface/behavior/selectable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotText } from '$stylist/typography/interface/slot/text';

export interface RecipeTabs
	extends ComputeIntersectAll<
		[
			Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
				SlotChildren & {
					selectedId?: string;
					onValueChange?: (id: string) => void;
					variant?: TokenColorTone;
					size?: TokenSize;
					disabled?: boolean;
				},
			SlotText,
			SlotIcon,
			BehaviorSelectable<string>,
			BehaviorFocusable,
			BehaviorSizable
		]
	> {}
