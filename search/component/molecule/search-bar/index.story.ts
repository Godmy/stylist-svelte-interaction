import SearchBar from '$stylist/search/component/molecule/search-bar/index.svelte';
import type { RecipeSearchBar } from '$stylist/search/interface/recipe/search-bar';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Search bar component with debounce and clear functionality. */
export default {
	component: SearchBar,
	title: 'SearchBar',
	description: 'Search bar component with debounce and clear functionality',
	args: { placeholder: 'Search...', value: '', disabled: false, debounceMs: 300 },
	controls: {
		placeholder: { type: 'text', description: 'Placeholder text for the search bar' },
		value: { type: 'text', description: 'Current value of the search bar' },
		disabled: { type: 'boolean', description: 'Whether the search bar is disabled' },
		debounceMs: { type: 'number', description: 'Debounce time in milliseconds' }
	},
	presets: {
		Filled: { value: 'invoice' },
		Disabled: { disabled: true }
	}
} satisfies ContractStory<RecipeSearchBar>;
