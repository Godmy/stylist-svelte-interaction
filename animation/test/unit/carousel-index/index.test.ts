import { describe, expect, it } from 'vitest';
import { carouselIndex } from '$stylist/animation/function/resolve/carousel-index';

describe('carouselIndex', () => {
	it('clamps the selection into the list and truncates fractions', () => {
		expect(carouselIndex(5, 3)).toBe(2);
		expect(carouselIndex(-2, 3)).toBe(0);
		expect(carouselIndex(1.8, 3)).toBe(1);
	});

	it('returns -1 for an empty list and the first image for an invalid index', () => {
		expect(carouselIndex(0, 0)).toBe(-1);
		expect(carouselIndex(0, NaN)).toBe(-1);
		expect(carouselIndex(NaN, 4)).toBe(0);
	});
});
