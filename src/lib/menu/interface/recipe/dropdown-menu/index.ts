import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { TokenAlignment } from '$stylist/layout/type/alias/alignment';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorScrollable } from '$stylist/layout/interface/behavior/scrollable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotText } from '$stylist/typography/interface/slot/text';

export interface RecipeDropdownMenu
	extends ComputeIntersectAll<
		[
			Omit<HTMLAttributes<HTMLElement>, 'children'> & {
				label: string;
				position?: TokenAlignment;
				disabled?: boolean;
				class?: string;
				children?: Snippet<
					[
						{
							closeDropdown: () => void;
						}
					]
				>;
			},
			SlotText,
			SlotIcon,
			BehaviorClickable,
			BehaviorFocusable,
			BehaviorSizable,
			BehaviorScrollable
		]
	> {}
