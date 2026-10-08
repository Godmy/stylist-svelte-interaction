import { TOKEN_EASING } from '$stylist/theme/const/object/easing';
import type { EasingFunction } from '$stylist/animation/type/compute/get-easing-function';

type EasingValue = (typeof TOKEN_EASING)[keyof typeof TOKEN_EASING];

export const BASE_EASING: Partial<Record<EasingValue, EasingFunction>> = {
	[TOKEN_EASING.LINEAR]: (t) => t,
	[TOKEN_EASING.EASE_IN]: (t) => t * t,
	[TOKEN_EASING.EASE_OUT]: (t) => t * (2 - t),
	[TOKEN_EASING.EASE_IN_OUT]: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
};
