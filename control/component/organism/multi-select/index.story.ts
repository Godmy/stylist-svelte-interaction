import MultiSelect from './index.svelte';
import type { RecipeMultiSelect } from '$stylist/control/interface/recipe/multi-select';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Multi-selection control with searchable dropdown. */
export default {
	component: MultiSelect,
	title: 'MultiSelect',
	description: 'Multi-selection control with searchable dropdown.',
	args: {
		options: [
			{ value: 'react', label: 'React' },
			{ value: 'svelte', label: 'Svelte' },
			{ value: 'vue', label: 'Vue' },
			{ value: 'angular', label: 'Angular' },
			{ value: 'solid', label: 'Solid' }
		],
		value: [],
		disabled: false,
		searchable: true,
		maxSelections: 0,
		placeholder: 'Select options...'
	},
	controls: {
		disabled: { type: 'boolean' },
		searchable: { type: 'boolean' },
		maxSelections: { type: 'number', min: 0, max: 5, step: 1 },
		placeholder: { type: 'text' }
	}
} satisfies ContractStory<RecipeMultiSelect>;
