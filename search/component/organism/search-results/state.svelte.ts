import { SEARCH_ICON_NAME } from '$stylist/search/const/value/search-icon-name';
import type { SearchResultItem } from '$stylist/search/type/object/search-results-item';
import type { RecipeSearchResults } from '$stylist/search/interface/recipe/search-results';

export function createSearchResultsState(getProps: () => RecipeSearchResults) {
	const props = $derived(getProps());
	const displayedResults = $derived((props.results ?? []).slice(0, props.maxResults ?? 10));
	const empty = $derived(displayedResults.length === 0 && Boolean(props.query));
	const rootClass = $derived(['c-search-results', props.class].filter(Boolean).join(' '));

	function icon(type: SearchResultItem['type']) {
		if (type === 'user') return 'user';
		if (type === 'event') return 'calendar';
		if (type === 'document') return 'file-text';
		return SEARCH_ICON_NAME;
	}

	function metadata(result: SearchResultItem) {
		const { date, author, location } = result.metadata ?? {};
		return [date, author, location].filter(Boolean).join(' · ');
	}

	return {
		get displayedResults() {
			return displayedResults;
		},
		get empty() {
			return empty;
		},
		get rootClass() {
			return rootClass;
		},
		icon,
		metadata
	};
}

export default createSearchResultsState;
