import type { InteractionFeedback } from '$stylist/animation/type/alias/interaction-feedback';
import type { TokenEasing } from '$stylist/theme/type/alias/easing';
import type { TokenDuration } from '$stylist/theme/type/alias/duration';
import type { TokenAnimation } from '$stylist/theme/type/alias/animation';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { BehaviorMotion } from '$stylist/animation/interface/behavior/motion';
import type { BehaviorTransform } from '$stylist/animation/interface/behavior/transform';

export interface RecipeLayoutTransformation
	extends ComputeIntersectAll<
		[
			BehaviorMotion,
			BehaviorTransform,
			SlotChildren,
			{
				animation?: TokenAnimation;
				duration?: TokenDuration;
				easing?: TokenEasing;
				delay?: number;
				infinite?: boolean;
				direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
				iterations?: number | 'infinite';
				scale?: number;
				rotate?: number;
				translateX?: number;
				translateY?: number;
				skewX?: number;
				skewY?: number;
				transformOrigin?: string;
				animateOnHover?: boolean;
				animateOnClick?: boolean;
				animateInfinite?: boolean;
				interactionIntent?:
					| 'tap'
					| 'doubleTap'
					| 'longPress'
					| 'drag'
					| 'drop'
					| 'swipe'
					| 'resize'
					| 'zoom';
				interactionFeedback?: InteractionFeedback;
				interactionDelay?: number;
				interactionDuration?: string;
				interactionState?: 'idle' | 'pressed' | 'hover' | 'disabled' | 'active';
				interactionSticky?: boolean;
				interactionThreshold?: number;
				disabled?: boolean;
				class?: string;
			}
		]
	> {}
