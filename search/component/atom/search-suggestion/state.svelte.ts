import type { SearchSuggestionItem } from '$stylist/search/type/object/search-suggestion-item';
import type { RecipeSearchSuggestion } from '$stylist/search/interface/recipe/search-suggestion';

export function createSearchSuggestionState(getProps: () => RecipeSearchSuggestion) {
	const props = $derived(getProps());
	const displayedSuggestions = $derived(
		(props.suggestions ?? []).slice(0, props.maxSuggestions ?? 5)
	);
	const empty = $derived(displayedSuggestions.length === 0 && Boolean(props.query));
	const rootClass = $derived(['c-search-suggestion', props.class].filter(Boolean).join(' '));
	const buttonClass = $derived(
		['c-search-suggestion__button', props.suggestionClass].filter(Boolean).join(' ')
	);

	return {
		get displayedSuggestions() {
			return displayedSuggestions;
		},
		get empty() {
			return empty;
		},
		get rootClass() {
			return rootClass;
		},
		get buttonClass() {
			return buttonClass;
		},
		handleSuggestionClick(suggestion: SearchSuggestionItem) {
			props.onValueChange?.(suggestion);
		}
	};
}

export default createSearchSuggestionState;
