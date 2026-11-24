import { PresetRatingFeedbackLabels } from '$stylist/form/const/preset/rating-feedback-labels';
import type { RecipeRatingFeedback } from '$stylist/form/interface/recipe/rating-feedback';
/** Reactive behavior of rating-feedback; props are read lazily when needed. */
export function createRatingFeedbackComponentState(
	getProps: () => Pick<RecipeRatingFeedback, 'labels' | 'onScoreSubmit'>
) {
	const props = $derived(getProps());
	const text = $derived({ ...PresetRatingFeedbackLabels, ...props['labels'] });
	let score = $state<number>();
	let submitted = $state<number>();
	function send(event: SubmitEvent) {
		event.preventDefault();
		if (score === undefined || !Number.isInteger(score) || score < 1 || score > 5) return;
		submitted = score;
		props['onScoreSubmit']?.(score);
	}
	return {
		get text(): typeof text {
			return text;
		},
		get score(): typeof score {
			return score;
		},
		set score(__nextValue: typeof score) {
			score = __nextValue;
		},
		get submitted(): typeof submitted {
			return submitted;
		},
		set submitted(__nextValue: typeof submitted) {
			submitted = __nextValue;
		},
		get send(): typeof send {
			return send;
		}
	};
}
export default createRatingFeedbackComponentState;
