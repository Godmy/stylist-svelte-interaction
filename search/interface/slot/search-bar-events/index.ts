/** Events interface for SearchBar component */
export interface SlotSearchBarEvents {
	/**
	 * Dispatched when a search is performed
	 */
	search: { query: string };

	/**
	 * Dispatched when the search is cleared
	 */
	clear: Record<string, never>;

	/**
	 * Dispatched when the input value changes
	 */
	input: { value: string };
}
