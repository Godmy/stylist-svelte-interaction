import { describe, expect, it } from 'vitest';
import { cooldownCounter } from '$stylist/form/function/resolve/cooldown-counter';

describe('cooldownCounter', () => {
	it('accepts once, rejects early repetition and accepts exactly at expiry', () => {
		expect(cooldownCounter(42, 2, 1000, 0)).toEqual({
			count: 44,
			availableAt: 6000,
			accepted: true
		});
		expect(cooldownCounter(44, 1, 5999, 6000).accepted).toBe(false);
		expect(cooldownCounter(44, 1, 6000, 6000).count).toBe(45);
	});

	it('rejects invalid and excessive increments', () => {
		for (const amount of [0, -1, 100, 1.5, NaN]) {
			expect(cooldownCounter(42, amount, 1000, 0).accepted).toBe(false);
		}
		expect(cooldownCounter(1000000, 1, 1000, 0).accepted).toBe(false);
	});
});
