import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { SlotFeedbackScenario } from '$stylist/form/interface/slot/feedback-scenario';

/** Rating card with an editable question, tone switch and the last submitted score. */
export interface RecipeFeedbackScenario
	extends Omit<RecipeHtmlSection, 'children' | 'title'>, SlotFeedbackScenario {}
