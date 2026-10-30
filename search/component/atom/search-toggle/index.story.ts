import SearchToggle from '$stylist/search/component/atom/search-toggle/index.svelte';
import type { RecipeSearchToggle } from '$stylist/search/interface/recipe/search-toggle';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Disclosure button of a search region; index.story.svelte keeps the open state. */
export default {
	component: SearchToggle,
	title: 'SearchToggle',
	description: 'Icon HtmlButton with aria-expanded that opens or closes a search region.',
	args: { open: false, openLabel: 'Open search', closeLabel: 'Close search' },
	controls: {
		open: { type: 'boolean' },
		openLabel: { type: 'text' },
		closeLabel: { type: 'text' },
		disabled: { type: 'boolean' }
	},
	presets: { Open: { open: true }, Disabled: { disabled: true } }
} satisfies ContractStory<RecipeSearchToggle>;
