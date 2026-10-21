import type { RecipeSearchSuggestion } from '$stylist/search/interface/recipe/search-suggestion';

export function createSearchSuggestionState(getProps: () => RecipeSearchSuggestion) {
	const props = $derived(getProps());
	const displayedSuggestions = $derived(
		(props.suggestions ?? []).slice(0, props.maxSuggestions ?? 5)
	);
	const rootClass = $derived(
		('search-suggestions' + (props.class ? ` ${props.class}` : '')).trim()
	);
	const buttonClass = $derived(
		(
			'search-suggestion__button' + (props.suggestionClass ? ` ${props.suggestionClass}` : '')
		).trim()
	);

	return {
		get displayedSuggestions() {
			return displayedSuggestions;
		},
		get rootClass() {
			return rootClass;
		},
		get buttonClass() {
			return buttonClass;
		},
		handleSuggestionClick(suggestion: RecipeSearchSuggestion['suggestions'][number]) {
			props.onValueInput?.(suggestion);
			props.onValueChange?.(suggestion);
		}
	};
}

export default createSearchSuggestionState;
