import SearchOverlay from '$stylist/search/component/molecule/search-overlay/index.svelte';
import type { RecipeSearchOverlay } from '$stylist/search/interface/recipe/search-overlay';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Toggle-opened `<search>`; index.story.svelte renders matching items as its results. */
export default {
	component: SearchOverlay,
	title: 'SearchOverlay',
	description:
		'HtmlSearch with a SearchToggle; the SearchField opens beside it and the results snippet drops below.',
	args: { open: true, query: 'tok', placeholder: 'Search entities…', skin: true },
	controls: {
		open: { type: 'boolean' },
		query: { type: 'text' },
		placeholder: { type: 'text' },
		skin: { type: 'boolean' }
	},
	presets: { Closed: { open: false, query: '' }, 'No results': { query: 'zzz' } },
	context: {
		kind: 'element',
		tag: 'div',
		attrs: { style: 'display: flex; justify-content: flex-end; min-height: 20rem;' },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeSearchOverlay>;
