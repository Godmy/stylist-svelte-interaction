export interface SlotSearchBar {
	/** Query text (`bind:value`). */
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	/**
	 * Delay of `onSearch` after typing, in milliseconds.
	 * @default 300
	 */
	debounceMs?: number;
	/** @default 'Search' */
	submitLabel?: string;
	/** @default 'Clear search' */
	clearLabel?: string;
	class?: string;
	/** Called with the query on every input and on clear. */
	onValueInput?: (value: string) => void;
	/** Called after the debounce, on Enter and on the submit button. */
	onSearch?: (query: string) => void;
	onClear?: () => void;
}
