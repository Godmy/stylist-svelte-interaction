import { describe, expect, it } from 'vitest';
import { tiltSample } from '$stylist/animation/function/transform/tilt-sample';

describe('tiltSample', () => {
	it('constrains pointer position, strength and maximum effective angle', () => {
		expect(tiltSample(5, -5, 30, false, 4)).toMatchObject({ x: 1, y: 0, rotateX: 45, rotateY: 45 });
		expect(tiltSample(1, 0, 12, false, 0)).toMatchObject({ rotateX: 0, rotateY: 0 });
	});

	it('independently disables axes', () => {
		expect(tiltSample(1, 0, 12, false, 1, false, true)).toMatchObject({ rotateX: 0, rotateY: 12 });
		expect(tiltSample(1, 0, 12, false, 1, true, false)).toMatchObject({ rotateX: 12, rotateY: 0 });
	});

	it('reverses rotation and suppresses inactive samples', () => {
		expect(tiltSample(1, 0, 12, true)).toMatchObject({ rotateX: -12, rotateY: -12 });
		expect(tiltSample(1, 0, 12, false, 1, true, true, false)).toMatchObject({
			rotateX: 0,
			rotateY: 0,
			active: false
		});
	});

	it('normalizes non-finite input', () => {
		expect(tiltSample(NaN, Infinity, NaN, false, NaN)).toMatchObject({
			x: 0.5,
			y: 0.5,
			rotateX: 0,
			rotateY: 0
		});
	});
});
