/**
 * SearchBar component types and interfaces
 * Following SOLID principles with proper type definitions
 */

/** Props interface for SearchBar component */
export interface SlotSearchBar {
	/**
	 * Placeholder text for the search input
	 * @default 'Search nodes...'
	 */
	placeholder?: string;

	/**
	 * Current value of the search input
	 * @default ''
	 */
	value?: string;

	/**
	 * Whether the search bar is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Debounce time in milliseconds for search events
	 * @default 300
	 */
	debounceMs?: number;

	/**
	 * Additional CSS classes to apply to the search bar
	 */
	class?: string;

	/**
	 * Called when input value changes.
	 */
	onValueInput?: (value: string) => void;

	/**
	 * Called when value is committed/changed.
	 */
	onValueChange?: (value: string) => void;

	/**
	 * Called when search is executed.
	 */
	onSearch?: (query: string) => void;

	/**
	 * Called when value is cleared.
	 */
	onClear?: () => void;
}
