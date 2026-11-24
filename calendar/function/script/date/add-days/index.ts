/** `date` shifted by whole days, keeping the time of day. */
export function addDays(date: Date, days: number): Date {
	const d = new Date(date);
	d.setDate(d.getDate() + days);
	return d;
}
