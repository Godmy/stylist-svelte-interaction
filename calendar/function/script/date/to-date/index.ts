/**
 * Date values in component state stay immutable: every change makes a fresh instance
 * through these helpers instead of calling setters on a shared `Date`.
 */

/** Copy of a date, or a date parsed from a string or timestamp. */
export function toDate(value: Date | string | number): Date {
	return new Date(value);
}
