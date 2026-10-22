import AutoSearch from '$stylist/search/component/atom/auto-search/index.svelte';
import type { RecipeAutoSearch } from '$stylist/search/interface/recipe/auto-search';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Text search field with immediate change callbacks. */
export default {
	component: AutoSearch,
	title: 'AutoSearch',
	description: 'Text search field with immediate change callbacks.',
	args: { placeholder: 'Search projects...', value: '' },
	controls: {
		placeholder: { type: 'text' },
		value: { type: 'text' }
	}
} satisfies ContractStory<RecipeAutoSearch>;
