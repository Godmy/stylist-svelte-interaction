import type { TiltSample } from '$stylist/animation/type/struct/tilt-sample';

/** Pointer-driven perspective tilt; ignored for touch, reduced motion and devices without hover. */
export interface BehaviorTilt {
	disabled?: boolean;
	/** Largest rotation in degrees before `strength`, clamped to 0–45. */
	maxAngle?: number;
	/** Perspective distance in px. */
	perspective?: number;
	/** Surface scale while tilted, clamped to 0.1–3. */
	scale?: number;
	reverse?: boolean;
	/** Transition duration in ms. */
	duration?: number;
	xAxis?: boolean;
	yAxis?: boolean;
	/** Return to rest when the pointer leaves. */
	recovery?: boolean;
	/** Multiplier of `maxAngle`, clamped to 0–4. */
	strength?: number;
	glare?: boolean;
	/** Peak glare opacity, 0–1. */
	glareOpacity?: number;
	/** Content lift in px, 0–100. */
	depth?: number;
	onTilt?: (sample: TiltSample) => void;
}
