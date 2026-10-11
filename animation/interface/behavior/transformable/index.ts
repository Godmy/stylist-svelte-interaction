import type { TokenAnimation } from '$stylist/design-token/type/alias/animation';
import type { TokenDuration } from '$stylist/design-token/type/alias/duration';
import type { TokenEasing } from '$stylist/design-token/type/alias/easing';
export interface BehaviorTransformable {
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
	disabled?: boolean;
}
