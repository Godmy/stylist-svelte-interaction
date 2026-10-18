export interface RecipeScrollPhaseDebug {
	/** Scroll progress of the sequence, 0-1. */
	progress?: number;
	/** Name of the active animation phase. */
	phase?: string;
	/** Whether the WebGL renderer is active. */
	webgl?: boolean;
	/** Whether the reduced-motion fallback is active. */
	reducedMotion?: boolean;
}
