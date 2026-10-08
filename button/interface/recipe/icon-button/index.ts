import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorClickable } from '$stylist/layout/interface/behavior/clickable';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorSizable } from '$stylist/layout/interface/behavior/sizable';
import type { SlotIcon } from '$stylist/svg/interface/slot/icon';
import type { HTMLAttributes } from 'svelte/elements';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { SlotButtonDom } from '$stylist/button/interface/slot/button-dom';
import type { Snippet } from 'svelte';
export interface RecipeIconButton
	extends ComputeIntersectAll<
		[
			SlotButtonDom,
			SlotChildren,
			HTMLAttributes<HTMLButtonElement>,
			Omit<SlotIcon, 'icon'>,
			BehaviorClickable,
			BehaviorFocusable,
			BehaviorSizable
		]
	> {
	class?: string;
	icon?: string | Snippet;

	[prop: string]: unknown;
}
