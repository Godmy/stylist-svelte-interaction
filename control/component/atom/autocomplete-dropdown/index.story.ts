import AutocompleteDropdown from './index.svelte';
import type { RecipeAutocompleteDropdown } from '$stylist/control/interface/recipe/autocomplete-dropdown';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Dropdown selector with option list and controlled value. */
export default {
	component: AutocompleteDropdown,
	title: 'AutocompleteDropdown',
	description: 'Dropdown selector with option list and controlled value.',
	args: {
		options: [
			{ label: 'Design', value: 'design' },
			{ label: 'Development', value: 'development' },
			{ label: 'Marketing', value: 'marketing' },
			{ label: 'Operations', value: 'operations' }
		],
		placeholder: 'Select a team...'
	},
	controls: {
		placeholder: { type: 'text' }
	}
} satisfies ContractStory<RecipeAutocompleteDropdown>;
