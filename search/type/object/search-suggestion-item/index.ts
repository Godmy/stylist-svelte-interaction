/** One typeahead suggestion of SearchSuggestion. */
export type SearchSuggestionItem = {
	id: string;
	text: string;
	category?: string;
	/** Short text or emoji shown before the text. */
	icon?: string;
	count?: number;
};
