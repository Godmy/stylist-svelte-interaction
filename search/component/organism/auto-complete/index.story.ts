import AutoComplete from '$stylist/search/component/organism/auto-complete/index.svelte';
import type { RecipeAutoComplete } from '$stylist/search/interface/recipe/auto-complete';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** An auto-complete input component with suggestions. */
export default {
	component: AutoComplete,
	title: 'AutoComplete',
	description: 'An auto-complete input component with suggestions.',
	args: {
		options: [
			{ id: '1', label: 'Apple', value: 'apple', meta: 'Fruit' },
			{ id: '2', label: 'Banana', value: 'banana', meta: 'Tropical Fruit' },
			{ id: '3', label: 'Cherry', value: 'cherry', meta: 'Stone Fruit' },
			{ id: '4', label: 'Date', value: 'date', meta: 'Desert Fruit' },
			{ id: '5', label: 'Elderberry', value: 'elderberry', meta: 'Berry' },
			{ id: '6', label: 'Fig', value: 'fig', meta: 'Common Fig' },
			{ id: '7', label: 'Grape', value: 'grape', meta: 'Small Fruit' },
			{ id: '8', label: 'Honeydew', value: 'honeydew', meta: 'Melon' }
		],
		placeholder: 'Type to search...',
		showAllSuggestions: true,
		debounce: 300
	},
	controls: {
		placeholder: { type: 'text' },
		showAllSuggestions: { type: 'boolean' },
		debounce: { type: 'number' }
	}
} satisfies ContractStory<RecipeAutoComplete>;
