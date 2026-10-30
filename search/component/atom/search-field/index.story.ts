import SearchField from '$stylist/search/component/atom/search-field/index.svelte';
import type { RecipeSearchField } from '$stylist/search/interface/recipe/search-field';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** `<input type="search">` with an icon; index.story.svelte binds the value that Escape clears. */
export default {
	component: SearchField,
	title: 'SearchField',
	description:
		'HtmlInputSearch with a leading icon and a scoped html skin; Escape clears the query.',
	args: { value: '', placeholder: 'Search…', name: 'q', icon: true, skin: true },
	controls: {
		value: { type: 'text' },
		placeholder: { type: 'text' },
		icon: { type: 'boolean' },
		skin: { type: 'boolean' },
		disabled: { type: 'boolean' },
		required: { type: 'boolean' }
	},
	presets: {
		Filled: { value: 'design tokens' },
		'Without icon': { icon: false },
		Disabled: { disabled: true },
		Native: { skin: false }
	}
} satisfies ContractStory<RecipeSearchField>;
