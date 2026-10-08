import type { HTMLAttributes } from 'svelte/elements';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { TokenSize } from '$stylist/theme/type/alias/size';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipePagination
	extends ComputeIntersectAll<
		[
			HTMLAttributes<HTMLDivElement>,
			{
				currentPage: number;
				totalPages: number;
				showFirstLast?: boolean;
				showPrevNext?: boolean;
				showDots?: boolean;
				maxVisible?: number;
				size?: TokenSize;
				disabled?: boolean;
				class?: string;
				buttonClass?: string;
				activeButtonClass?: string;
				disabledButtonClass?: string;
				onPageChange?: (page: number) => void;
			},
			SlotText,
			SlotIcon,
			BehaviorClickable,
			BehaviorFocusable,
			BehaviorSizable
		]
	> {}
