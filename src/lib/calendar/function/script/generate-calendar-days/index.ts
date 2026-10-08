import type { SlotCalendarDay } from '$stylist/calendar/interface/slot/calendar-day';

export function generateCalendarDays(input: {
	month: Date;
	weekStartsOn?: 0 | 1;
	selectedDate?: Date | null;
	rangeStart?: Date | null;
	rangeEnd?: Date | null;
	minDate?: Date | null;
	maxDate?: Date | null;
	isDateDisabled?: (date: Date) => boolean;
}): SlotCalendarDay[] {
	function startOfDay(date: Date): Date {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}

	function isSameDay(a: Date, b: Date): boolean {
		return a.getTime() === b.getTime();
	}

	const { month, weekStartsOn = 1, isDateDisabled } = input;
	const today = startOfDay(new Date());
	const selectedDate = input.selectedDate ? startOfDay(input.selectedDate) : null;
	const rangeStart = input.rangeStart ? startOfDay(input.rangeStart) : null;
	const rangeEnd = input.rangeEnd ? startOfDay(input.rangeEnd) : null;
	const minDate = input.minDate ? startOfDay(input.minDate) : null;
	const maxDate = input.maxDate ? startOfDay(input.maxDate) : null;

	const firstOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
	const leadingBlanks = (firstOfMonth.getDay() - weekStartsOn + 7) % 7;
	const gridStart = new Date(firstOfMonth);
	gridStart.setDate(gridStart.getDate() - leadingBlanks);

	return Array.from({ length: 42 }, (_, index) => {
		const date = new Date(gridStart);
		date.setDate(gridStart.getDate() + index);
		const day = startOfDay(date);

		const isRangeStart = rangeStart !== null && isSameDay(day, rangeStart);
		const isRangeEnd = rangeEnd !== null && isSameDay(day, rangeEnd);
		const isInRange =
			rangeStart !== null && rangeEnd !== null && day > rangeStart && day < rangeEnd;

		const isOutOfBounds = (minDate !== null && day < minDate) || (maxDate !== null && day > maxDate);

		return {
			date,
			isCurrentMonth: date.getMonth() === month.getMonth(),
			isToday: isSameDay(day, today),
			isSelected: selectedDate !== null && isSameDay(day, selectedDate),
			isDisabled: isOutOfBounds || (isDateDisabled?.(date) ?? false),
			isRangeStart,
			isRangeEnd,
			isInRange,
			events: []
		};
	});
}

export default generateCalendarDays;
