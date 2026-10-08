import type { SearchResultItem } from '$stylist/search/type/object/search-results-item';
import type { RecipeSearchResults } from '$stylist/search/interface/recipe/search-results';

const Calendar = 'calendar';
const MapPin = 'map-pin';
const Search = 'search';
const User = 'user';

export function createSearchResultsState(getProps: () => RecipeSearchResults) {
	const props = $derived(getProps());
	const results = $derived(props.results ?? []);
	const query = $derived(props.query ?? '');
	const loading = $derived(props.loading ?? false);
	const className = $derived(props.class ?? '');
	const showMetadata = $derived(props.showMetadata ?? true);
	const maxResults = $derived(props.maxResults ?? 10);

	const displayedResults = $derived(results.slice(0, maxResults));

	function icon(type: SearchResultItem['type']) {
		if (type === 'user') return User;
		if (type === 'event') return Calendar;
		if (type === 'document') return MapPin;
		return Search;
	}

	const rootClass = $derived(['c-search-results', props.class].filter(Boolean).join(' '));

	return {
		get results() {
			return results;
		},
		get query() {
			return query;
		},
		get loading() {
			return loading;
		},
		get className() {
			return className;
		},
		get displayedResults() {
			return displayedResults;
		},
		get showMetadata() {
			return showMetadata;
		},
		get rootClass() {
			return rootClass;
		},
		icon,
		onResultClick: props.onResultClick
	};
}

export default createSearchResultsState;
