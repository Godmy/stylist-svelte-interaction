import type { PresetRatingFeedbackLabels } from '$stylist/form/const/preset/rating-feedback-labels';

/** Question, card tone and label overrides. */
export interface SlotRatingFeedback {
	title?: string;
	/** `dark` uses the inverse surface, `light` the warm container surface. */
	tone?: 'dark' | 'light';
	labels?: Partial<Record<keyof typeof PresetRatingFeedbackLabels, string>>;
}
