import type { RecipeLetterArcPath } from '$stylist/animation/interface/recipe/letter-arc-path';
/** Reactive behavior of letter-arc-path; props are read lazily when needed. */
export function createLetterArcPathComponentState(
	getProps: () => Pick<RecipeLetterArcPath, 'points' | 'progress'> & {
		progress: Exclude<RecipeLetterArcPath['progress'], undefined>;
	}
) {
	const props = $derived(getProps());
	const pointList = $derived(props['points'].map((point) => `${point.x},${point.y}`).join(' '));
	const lineLength = $derived(
		props['points'].slice(1).reduce((total, point, index) => {
			const previous = props['points'][index];
			return total + Math.hypot(point.x - previous.x, point.y - previous.y);
		}, 0)
	);
	const clampedProgress = $derived(Math.min(1, Math.max(0, props['progress'])));
	return {
		get pointList(): typeof pointList {
			return pointList;
		},
		get lineLength(): typeof lineLength {
			return lineLength;
		},
		get clampedProgress(): typeof clampedProgress {
			return clampedProgress;
		}
	};
}
export default createLetterArcPathComponentState;
