/** The day of `date` at `hours:minutes`, seconds and milliseconds zeroed. */
export function withTime(date: Date, hours: number, minutes = 0): Date {
	const d = new Date(date);
	d.setHours(hours, minutes, 0, 0);
	return d;
}
