/** Submitting reports the chosen integer score from 1 to 5. */
export interface BehaviorRatingFeedback {
	onScoreSubmit?: (score: number) => void;
}
