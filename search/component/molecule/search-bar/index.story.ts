import SearchBar from '$stylist/search/component/molecule/search-bar/index.svelte';
import type { RecipeSearchBar } from '$stylist/search/interface/recipe/search-bar';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Live `<search>` region with debounce, clear and submit. */
export default {
	component: SearchBar,
	title: 'SearchBar',
	description:
		'HtmlSearch with SearchField, a clear button and a submit HtmlButton; onSearch is debounced and fires on Enter.',
	args: { placeholder: 'Search…', value: '', disabled: false, debounceMs: 300, skin: true },
	controls: {
		placeholder: { type: 'text', description: 'Placeholder of the field' },
		value: { type: 'text', description: 'Current query' },
		disabled: { type: 'boolean', description: 'Disables the field and the buttons' },
		debounceMs: { type: 'number', description: 'Delay of onSearch after typing, ms' },
		submitLabel: { type: 'text' },
		clearLabel: { type: 'text' },
		skin: { type: 'boolean', description: 'Scoped html skin' }
	},
	presets: {
		Filled: { value: 'invoice' },
		Disabled: { disabled: true },
		Native: { skin: false, value: 'invoice' }
	}
} satisfies ContractStory<RecipeSearchBar>;
