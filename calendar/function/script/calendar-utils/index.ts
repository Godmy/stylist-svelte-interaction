/** 6 weeks around the month of `date`; `weekStartsOn` 0 = Sunday, 1 = Monday. */
export function generateCalendarGrid(date: Date, weekStartsOn = 0): Date[] {
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	const start = new Date(firstDay);
	start.setDate(firstDay.getDate() - ((firstDay.getDay() - weekStartsOn + 7) % 7));
	return Array.from({ length: 42 }, (_, i) => {
		const d = new Date(start);
		d.setDate(start.getDate() + i);
		return d;
	});
}

export function navigateMonth(date: Date, delta: number): Date {
	return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

export function isSameDay(a: Date, b: Date): boolean {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

export function isToday(date: Date): boolean {
	return isSameDay(date, new Date());
}

export function isWeekend(date: Date): boolean {
	const day = date.getDay();
	return day === 0 || day === 6;
}

export function startOfDay(date: Date): Date {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	return d;
}

export function startOfWeek(date: Date, weekStartsOn = 0): Date {
	const d = startOfDay(date);
	d.setDate(d.getDate() - ((d.getDay() - weekStartsOn + 7) % 7));
	return d;
}

export function toInputDateString(date: Date): string {
	return date.toISOString().split('T')[0];
}

export function fromInputDateString(s: string): Date {
	return new Date(`${s}T00:00:00`);
}
