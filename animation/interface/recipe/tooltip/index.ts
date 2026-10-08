import type { Snippet } from 'svelte';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { BehaviorMotionPreset } from '$stylist/animation/interface/behavior/motion-preset';
import type { BehaviorFocusable } from '$stylist/layout/interface/behavior/focusable';
import type { BehaviorShapeable } from '$stylist/layout/interface/behavior/shapeable';
import type { BehaviorSized } from '$stylist/layout/interface/behavior/sized';
import type { SlotTheme } from '$stylist/theme/interface/slot/theme';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotText } from '$stylist/typography/interface/slot/text';
import type { TokenAlignment } from '$stylist/layout/type/alias/alignment';
import type { TokenConnector } from '$stylist/animation/type/alias/connector';
import type { TokenTrigger } from '$stylist/layout/type/alias/trigger';
export interface RecipeTooltip
	extends ComputeIntersectAll<
		[
			SlotChildren,
			SlotText,
			BehaviorFocusable,
			BehaviorSized,
			BehaviorShapeable,
			BehaviorMotionPreset,
			SlotTheme
		]
	> {
	content: string | Snippet;
	placement?: TokenAlignment;
	trigger?: TokenTrigger;
	variant?: TokenConnector;
	show?: boolean;
	class?: string;
	tooltipClass?: string;
	arrowClass?: string;
	disabled?: boolean;
	asChild?: boolean;
	delay?: number;
	hideDelay?: number;
	onShow?: () => void;
	onHide?: () => void;
}
