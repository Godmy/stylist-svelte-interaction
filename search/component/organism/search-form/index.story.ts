import SearchForm from '$stylist/search/component/organism/search-form/index.svelte';
import type { RecipeSearchForm } from '$stylist/search/interface/recipe/search-form';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** A search form component with an input and a submit button. */
export default {
	component: SearchForm,
	title: 'SearchForm',
	description: 'A search form component with filters and advanced search capabilities.',
	args: { placeholder: 'Search...', query: '' },
	controls: {
		placeholder: { type: 'text' },
		query: { type: 'text' }
	}
} satisfies ContractStory<RecipeSearchForm>;
