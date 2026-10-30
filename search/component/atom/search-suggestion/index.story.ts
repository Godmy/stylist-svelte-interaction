import SearchSuggestion from '$stylist/search/component/atom/search-suggestion/index.svelte';
import type { RecipeSearchSuggestion } from '$stylist/search/interface/recipe/search-suggestion';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Typeahead suggestions: an HtmlUl of HtmlButtons with loading and empty states. */
export default {
	component: SearchSuggestion,
	title: 'SearchSuggestion',
	description: 'Suggestion list for typeahead and search UX.',
	args: {
		suggestions: [
			{ id: '1', text: 'Analytics dashboard', category: 'Pages', count: 12 },
			{ id: '2', text: 'Annual report', category: 'Documents', count: 3 },
			{ id: '3', text: 'Team settings', category: 'Settings', count: 1 },
			{ id: '4', text: 'API tokens', category: 'Security', count: 2 }
		],
		query: 'a',
		loading: false,
		maxSuggestions: 4,
		skin: true
	},
	controls: {
		query: { type: 'text' },
		loading: { type: 'boolean' },
		maxSuggestions: { type: 'number', min: 1, max: 10, step: 1 },
		skin: { type: 'boolean' }
	},
	presets: {
		Loading: { loading: true },
		Empty: { suggestions: [], query: 'zzz' }
	}
} satisfies ContractStory<RecipeSearchSuggestion>;
