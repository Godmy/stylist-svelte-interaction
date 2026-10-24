/** Bounded local action count; `now` is a host-supplied monotonic time in milliseconds. */
export function cooldownCounter(
	count: number,
	amount: number,
	now: number,
	availableAt: number
): { count: number; availableAt: number; accepted: boolean } {
	const valid =
		[count, amount, now, availableAt].every(Number.isFinite) &&
		Number.isInteger(count) &&
		count >= 0 &&
		Number.isInteger(amount) &&
		amount >= 1 &&
		amount <= 99 &&
		now >= availableAt &&
		count + amount <= 1000000;
	if (!valid) return { count, availableAt, accepted: false };
	return { count: count + amount, availableAt: now + 5000, accepted: true };
}
