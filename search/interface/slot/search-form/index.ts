export interface SlotSearchForm {
	/** Query text (`bind:query`). */
	query?: string;
	placeholder?: string;
	/**
	 * Field name submitted with the form.
	 * @default 'q'
	 */
	name?: string;
	/** @default 'Search' */
	submitLabel?: string;
	class?: string;
	/** Called on submit; when set, the native submission is prevented. */
	onSearch?: (query: string) => void;
}
