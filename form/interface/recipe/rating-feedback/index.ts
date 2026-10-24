import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { BehaviorRatingFeedback } from '$stylist/form/interface/behavior/rating-feedback';
import type { SlotRatingFeedback } from '$stylist/form/interface/slot/rating-feedback';

/** Five-point rating card with submit and confirmation states. */
export interface RecipeRatingFeedback
	extends Omit<RecipeHtmlSection, 'children' | 'title'>, BehaviorRatingFeedback, SlotRatingFeedback {}
