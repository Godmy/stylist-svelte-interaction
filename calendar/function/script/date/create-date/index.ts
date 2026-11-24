/** Local date from parts; `monthIndex` is 0-based and overflow rolls over like `new Date`. */
export function createDate(
	year: number,
	monthIndex: number,
	day = 1,
	hours = 0,
	minutes = 0
): Date {
	return new Date(year, monthIndex, day, hours, minutes);
}
