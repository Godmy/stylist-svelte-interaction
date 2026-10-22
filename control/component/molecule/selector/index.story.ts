import Selector from '$stylist/control/component/molecule/selector/index.svelte';
import type { RecipeSelector } from '$stylist/control/interface/recipe/selector';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Select component for choosing one option from a list. */
export default {
	component: Selector,
	title: 'Selector',
	description: 'Select component for choosing one option from a list',
	args: {
		id: 'selector-story',
		label: 'Select an option',
		value: 'option1',
		options: [
			{ value: 'option1', label: 'Option 1' },
			{ value: 'option2', label: 'Option 2' },
			{ value: 'option3', label: 'Option 3' }
		],
		required: false,
		disabled: false,
		placeholder: 'Choose an option...',
		errors: []
	},
	controls: {
		label: { type: 'text', description: 'Label for the select component' },
		required: { type: 'boolean', description: 'Whether the select is required' },
		disabled: { type: 'boolean', description: 'Whether the select is disabled' },
		placeholder: { type: 'text', description: 'Placeholder shown without a value' }
	},
	presets: {
		'With error': { errors: ['This field is required'] }
	}
} satisfies ContractStory<RecipeSelector>;
