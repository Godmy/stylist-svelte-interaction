import SearchForm from './index.svelte';
import type { RecipeSearchForm } from '$stylist/form/interface/recipe/search-form';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Search input with icon and submit button. */
export default {
	component: SearchForm,
	title: 'SearchForm',
	description: 'A search form component with filters and advanced search capabilities.',
	args: { placeholder: 'Search...', query: '' },
	controls: {
		placeholder: { type: 'text' },
		query: { type: 'text' }
	},
	presets: { WithQuery: { query: 'design tokens' } },
	layout: 'padded'
} satisfies ContractStory<RecipeSearchForm>;
