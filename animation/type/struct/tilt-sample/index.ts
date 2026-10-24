/** Normalized pointer position, the rotation it produces and whether the tilt is engaged. */
export type TiltSample = {
	x: number;
	y: number;
	rotateX: number;
	rotateY: number;
	active: boolean;
};
