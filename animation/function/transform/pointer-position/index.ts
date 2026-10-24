/** Normalize viewport coordinates to [0, 1] inside a rectangle; degenerate rectangles give the centre. */
export function pointerPosition(
	clientX: number,
	clientY: number,
	rect: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>
): { x: number; y: number } {
	return {
		x:
			Number.isFinite(clientX) && rect.width > 0
				? Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
				: 0.5,
		y:
			Number.isFinite(clientY) && rect.height > 0
				? Math.min(1, Math.max(0, (clientY - rect.top) / rect.height))
				: 0.5
	};
}
