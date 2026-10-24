/** Resolve a usable selection for empty, shrinking or externally controlled lists; -1 when empty. */
export function carouselIndex(index: number, length: number): number {
	if (!Number.isFinite(length) || length <= 0) return -1;
	return Math.max(
		0,
		Math.min(Math.floor(length) - 1, Number.isFinite(index) ? Math.trunc(index) : 0)
	);
}
