import type { TokenAnimation } from '$stylist/theme/type/alias/animation';
import type { TokenDuration } from '$stylist/theme/type/alias/duration';
import type { TokenEasing } from '$stylist/theme/type/alias/easing';
export interface BehaviorAnimate {
	animation?: TokenAnimation;
	duration?: TokenDuration;
	easing?: TokenEasing;
	delay?: number;
	infinite?: boolean;
	direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
	iterations?: number | 'infinite';
	from?: number;
	to?: number;
	format?: (value: number) => string;
}
