import type { SearchSuggestionItem } from '$stylist/search/type/object/search-suggestion-item';

export interface SlotSearchSuggestion {
	suggestions?: SearchSuggestionItem[];
	query?: string;
	loading?: boolean;
	class?: string;
	suggestionClass?: string;
	/** Called when a suggestion is picked. */
	onValueChange?: (suggestion: SearchSuggestionItem) => void;
	/** @default 5 */
	maxSuggestions?: number;
}
