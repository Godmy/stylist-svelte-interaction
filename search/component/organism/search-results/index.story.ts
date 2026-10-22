import SearchResults from '$stylist/search/component/organism/search-results/index.svelte';
import type { RecipeSearchResults } from '$stylist/search/interface/recipe/search-results';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** List of search results with type icons and optional metadata. */
export default {
	component: SearchResults,
	title: 'SearchResults',
	description: 'List of search results with type icons and optional metadata.',
	args: {
		results: [
			{
				id: '1',
				title: 'SlotOrder #1001',
				description: 'SlotOrder detail page',
				type: 'generic',
				metadata: { date: '2026-02-14', author: 'Admin' }
			},
			{
				id: '2',
				title: 'Invoice Document',
				description: 'PDF invoice',
				type: 'document',
				metadata: { date: '2026-02-10' }
			},
			{
				id: '3',
				title: 'John Doe',
				description: 'Customer profile',
				type: 'user',
				metadata: { location: 'NYC' }
			}
		],
		query: 'order',
		showMetadata: true,
		loading: false
	},
	controls: {
		showMetadata: { type: 'boolean' },
		loading: { type: 'boolean' }
	},
	presets: {
		Loading: { loading: true },
		Empty: { results: [], query: 'missing' }
	}
} satisfies ContractStory<RecipeSearchResults>;
