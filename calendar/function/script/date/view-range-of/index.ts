import { startOfDay } from '$stylist/calendar/function/script/calendar-utils';

/** Day, Sunday-based week or month around `base`, as start and end days at midnight. */
export function viewRangeOf(
	base: Date,
	mode: 'day' | 'week' | 'month'
): { start: Date; end: Date } {
	const start = startOfDay(base);
	if (mode === 'week') start.setDate(start.getDate() - start.getDay());
	if (mode === 'month') start.setDate(1);
	const end = new Date(start);
	if (mode === 'week') end.setDate(start.getDate() + 6);
	if (mode === 'month') end.setMonth(start.getMonth() + 1, 0);
	return { start, end };
}
