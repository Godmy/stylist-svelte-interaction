import { tiltRotation } from '$stylist/animation/function/transform/tilt-rotation';
import type { TiltSample } from '$stylist/animation/type/struct/tilt-sample';

/** Normalize a pointer sample, scale it by `strength` (0–4) and constrain each rotation axis. */
export function tiltSample(
	x: number,
	y: number,
	maxAngle = 12,
	reverse = false,
	strength = 1,
	xAxis = true,
	yAxis = true,
	active = true
): TiltSample {
	const safeX = Math.min(1, Math.max(0, Number.isFinite(x) ? x : 0.5));
	const safeY = Math.min(1, Math.max(0, Number.isFinite(y) ? y : 0.5));
	const multiplier = Number.isFinite(strength) ? Math.min(4, Math.max(0, strength)) : 1;
	const limit = Number.isFinite(maxAngle) ? Math.min(45, Math.max(0, maxAngle)) : 12;
	const rotation = tiltRotation(safeX, safeY, limit * multiplier, reverse);
	return {
		x: safeX,
		y: safeY,
		rotateX: active && xAxis ? rotation.x : 0,
		rotateY: active && yAxis ? rotation.y : 0,
		active
	};
}
