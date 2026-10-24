import { describe, expect, it } from 'vitest';
import { pointerPosition } from '$stylist/animation/function/transform/pointer-position';

describe('pointerPosition', () => {
	const rect = { left: 100, top: 50, width: 200, height: 100 };

	it('normalizes and clamps coordinates to the rectangle', () => {
		expect(pointerPosition(150, 75, rect)).toEqual({ x: 0.25, y: 0.25 });
		expect(pointerPosition(0, 500, rect)).toEqual({ x: 0, y: 1 });
	});

	it('falls back to the centre for degenerate rectangles and invalid input', () => {
		expect(pointerPosition(150, 75, { ...rect, width: 0, height: 0 })).toEqual({ x: 0.5, y: 0.5 });
		expect(pointerPosition(NaN, Infinity, rect)).toEqual({ x: 0.5, y: 0.5 });
	});
});
