/** Local date from an `<input type="date">` value and an `HH:MM` time. */
export function fromInputDateTime(date: string, time: string): Date {
	return new Date(`${date}T${time}:00`);
}
