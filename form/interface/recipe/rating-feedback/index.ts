import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { BehaviorRatingFeedback } from '$stylist/form/interface/behavior/rating-feedback';
import type { PresetRatingFeedbackLabels } from '$stylist/form/const/preset/rating-feedback-labels';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/** Five-point rating card with submit and confirmation states. */
export interface RecipeRatingFeedback extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlSection, 'children' | 'title'>,
		BehaviorRatingFeedback,
		{
			title?: string;
			/** `dark` uses the inverse surface, `light` the warm container surface. */
			tone?: 'dark' | 'light';
			labels?: Partial<Record<keyof typeof PresetRatingFeedbackLabels, string>>;
		}
	]
> {}
