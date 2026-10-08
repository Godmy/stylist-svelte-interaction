import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { HTMLAttributes } from 'svelte/elements';
import type { TokenColorTone } from '$stylist/theme/type/alias/color-tone';
export interface RecipeMenuItem
	extends ComputeIntersectAll<
		[
			HTMLAttributes<HTMLElement>,
			SlotChildren,
			SlotText,
			SlotIcon,
			BehaviorClickable,
			BehaviorFocusable,
			BehaviorSizable
		]
	> {
	/**
	 * Whether the menu item is active
	 * @default false
	 */
	active?: boolean;
	/**
	 * Variant of the menu item
	 * @default 'default'
	 */
	variant?: TokenColorTone;
	/**
	 * Link URL for the menu item
	 */
	href?: string;
	/**
	 * Icon name for the menu item
	 */
	icon?: string;
	/**
	 * Whether the menu item is disabled
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Whether the link opens in a new tab
	 * @default false
	 */
	external?: boolean;
	/**
	 * Children snippet for the menu item
	 */
	/**
	 * Additional CSS classes
	 */
	class?: string;
	/**
	 * Canonical callback fired when the menu item receives value interaction
	 */
	onValueInput?: (event: MouseEvent) => void;
	/**
	 * Canonical callback fired when the menu item value is changed
	 */
	onValueChange?: (event: MouseEvent) => void;
	/**
	 * @deprecated use onValueChange
	 */
	onClick?: (event: MouseEvent) => void;
}
