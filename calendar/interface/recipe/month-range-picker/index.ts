/**
 * A period of whole months stepped with ‹ › and an arbitrary range typed by hand.
 * Days are ISO `YYYY-MM-DD` strings in UTC calendar terms.
 */
export interface RecipeMonthRangePicker {
	from: string;
	to: string;
	/** Called with the next month (‹ ›) or the typed range; the consumer updates `from`/`to`. */
	onChange?: (range: { from: string; to: string }) => void;
	/** Locale of the summary (month name or the two dates); defaults to `ru-RU`. */
	locale?: string;
	/** Accessible name of the whole control; defaults to «Period». */
	label?: string;
	previousLabel?: string;
	nextLabel?: string;
	fromLabel?: string;
	toLabel?: string;
	applyLabel?: string;
	class?: string;
}
