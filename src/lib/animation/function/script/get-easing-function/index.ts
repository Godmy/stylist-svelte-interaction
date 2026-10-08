import { BASE_EASING } from '$stylist/animation/const/record/base-easing';
import { TOKEN_EASING } from '$stylist/theme/const/object/easing';
import type { EasingFunction } from '$stylist/animation/type/compute/get-easing-function';

type EasingValue = (typeof TOKEN_EASING)[keyof typeof TOKEN_EASING];

export function getEasingFunction(easing: EasingValue): EasingFunction {
	return BASE_EASING[easing] ?? BASE_EASING[TOKEN_EASING.EASE_OUT]!;
}
