import type { TokenDuration } from '$stylist/theme/type/alias/duration';
import type { TokenEasing } from '$stylist/theme/type/alias/easing';
export interface BehaviorVectorScene {
	mode?: 'ambient' | 'progress' | 'interaction';
	progress?: number;
	duration?: TokenDuration;
	easing?: TokenEasing;
	animateOnHover?: boolean;
	animateOnClick?: boolean;
	active?: boolean;
}
