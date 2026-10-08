import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
import type { BehaviorTransformable } from '$stylist/animation/interface/behavior/transformable';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorDraggable } from '$stylist/layout/interface/behavior/draggable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { LayoutHTMLAttributes } from '$stylist/layout/interface/behavior/layout-html-attributes';
import type { BehaviorScrollable } from '$stylist/layout/interface/behavior/scrollable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { TokenAlignment } from '$stylist/layout/type/alias/alignment';
import type { NavItem } from '$stylist/navigation/interface/slot/nav-item';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotText } from '$stylist/typography/interface/slot/text';

export interface RecipeSidebar
	extends ComputeIntersectAll<
		[
			LayoutHTMLAttributes<HTMLElement>,
			HTMLAttributes<HTMLDivElement>,
			{
				items: NavItem[];
				title?: string;
				logo?: Snippet;
				footer?: Snippet;
				collapsed?: boolean;
				collapsible?: boolean;
				mobileBreakpoint?: number;
				width?: number;
				mobileWidth?: string;
				position?: TokenAlignment;
				disabled?: boolean;
				navClass?: string;
				itemClass?: string;
				activeItemClass?: string;
				disabledItemClass?: string;
				titleClass?: string;
				logoClass?: string;
				footerClass?: string;
				class?: string;
			},
			SlotChildren,
			SlotTheme,
			SlotText,
			SlotIcon,
			BehaviorClickable,
			BehaviorDraggable,
			BehaviorTransformable,
			BehaviorFocusable,
			BehaviorSizable,
			BehaviorScrollable
		]
	> {}
