import SearchForm from '$stylist/search/component/organism/search-form/index.svelte';
import type { RecipeSearchForm } from '$stylist/search/interface/recipe/search-form';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** `<search><form>` that submits one named query. */
export default {
	component: SearchForm,
	title: 'SearchForm',
	description:
		'HtmlSearch > HtmlForm with a named SearchField and a submit HtmlButton; onSearch replaces the native submission.',
	args: { placeholder: 'Search…', query: '', name: 'q', action: '/search', skin: true },
	controls: {
		placeholder: { type: 'text' },
		query: { type: 'text' },
		name: { type: 'text' },
		action: { type: 'text' },
		method: { type: 'select', options: ['get', 'post'] },
		submitLabel: { type: 'text' },
		skin: { type: 'boolean' }
	},
	presets: { WithQuery: { query: 'design tokens' }, Native: { skin: false } },
	layout: 'padded'
} satisfies ContractStory<RecipeSearchForm>;
