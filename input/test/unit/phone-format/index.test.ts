import { describe, expect, it } from 'vitest';
import { formatPhoneNumber } from '$stylist/input/function/state/format-phone-number/index.svelte';
import { normalizePhoneInputValue } from '$stylist/input/function/state/normalize-phone-input-value/index.svelte';

describe('Russian phone composition', () => {
	it.each(['+7 (999) 123-45-67', '8 (999) 123-45-67', '79991234567'])(
		'normalises and round-trips %s without duplicating its country prefix',
		(input) => {
			const value = normalizePhoneInputValue(input);
			expect(value).toBe('79991234567');
			expect(formatPhoneNumber(value)).toBe('+7 (999) 123-45-67');
			expect(normalizePhoneInputValue(formatPhoneNumber(value))).toBe(value);
		}
	);
	it('keeps empty input empty', () => {
		expect(formatPhoneNumber('')).toBe('');
		expect(normalizePhoneInputValue('')).toBe('');
	});
});
