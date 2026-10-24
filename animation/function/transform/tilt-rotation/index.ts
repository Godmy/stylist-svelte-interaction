/** Convert a normalized pointer position to rotation angles bounded by `maxAngle` (at most 45°). */
export function tiltRotation(
	x: number,
	y: number,
	maxAngle = 12,
	reverse = false
): { x: number; y: number } {
	const limit = Number.isFinite(maxAngle) ? Math.min(45, Math.max(0, maxAngle)) : 12;
	const direction = reverse ? -1 : 1;
	return {
		x: (0.5 - Math.min(1, Math.max(0, Number.isFinite(y) ? y : 0.5))) * 2 * limit * direction,
		y: (Math.min(1, Math.max(0, Number.isFinite(x) ? x : 0.5)) - 0.5) * 2 * limit * direction
	};
}
