import { getEasingFunction } from '$stylist/animation/function/script/get-easing-function';
import { TOKEN_EASING } from '$stylist/theme/const/object/easing';
import type { TokenEasing } from '$stylist/theme/type/alias/easing';

export function mapProgress(
	progress: number,
	stops: { at: number; value: number; easing?: TokenEasing }[]
): number {
	if (stops.length === 0) return 0;

	const sorted = [...stops].sort((a, b) => a.at - b.at);
	const clamped = Math.min(Math.max(progress, sorted[0].at), sorted[sorted.length - 1].at);

	if (sorted.length === 1) return sorted[0].value;

	let start = sorted[0];
	let end = sorted[sorted.length - 1];

	for (let index = 0; index < sorted.length - 1; index += 1) {
		if (clamped >= sorted[index].at && clamped <= sorted[index + 1].at) {
			start = sorted[index];
			end = sorted[index + 1];
			break;
		}
	}

	const span = end.at - start.at;
	const localProgress = span === 0 ? 1 : (clamped - start.at) / span;
	const easingFunction = getEasingFunction(end.easing ?? TOKEN_EASING.LINEAR);

	return start.value + (end.value - start.value) * easingFunction(localProgress);
}
