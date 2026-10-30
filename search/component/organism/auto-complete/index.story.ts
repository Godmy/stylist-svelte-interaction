import AutoComplete from '$stylist/search/component/organism/auto-complete/index.svelte';
import type { RecipeAutoComplete } from '$stylist/search/interface/recipe/auto-complete';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Combobox over a search field with a listbox of options. */
export default {
	component: AutoComplete,
	title: 'AutoComplete',
	description:
		'SearchField with role=combobox and an HtmlUl listbox; arrows, Enter and Escape follow the ARIA combobox pattern.',
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
		placeholder: 'Type to search…',
		showAllSuggestions: true,
		skin: true
	},
	controls: {
		placeholder: { type: 'text' },
		value: { type: 'text' },
		showAllSuggestions: { type: 'boolean' },
		skin: { type: 'boolean' }
	},
	presets: { Filtered: { value: 'an' }, Native: { skin: false } },
	context: {
		kind: 'element',
		tag: 'div',
		attrs: { style: 'min-height: 18rem;' },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeAutoComplete>;
