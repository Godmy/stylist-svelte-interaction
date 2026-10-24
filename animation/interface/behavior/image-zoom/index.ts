/** Zoom on pointer hover, or toggled by click, touch or keyboard. */
export interface BehaviorImageZoom {
	zoomEnabled?: boolean;
	/** Magnification, clamped to 1–8. */
	zoomScale?: number;
	zoomOnHover?: boolean;
}
