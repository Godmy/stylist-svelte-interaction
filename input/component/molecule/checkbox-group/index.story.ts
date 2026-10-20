import CheckboxGroup from './index.svelte';
import type { RecipeCheckboxGroup } from '$stylist/input/interface/recipe/checkbox-group';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** A group of checkboxes for multiple selection. */
export default {
	component: CheckboxGroup,
	title: 'CheckboxGroup',
	description: 'A group of checkboxes for multiple selection',
	args: {
		options: [
			{
				id: 'option1',
				label: 'Option 1',
				value: 'option1',
				description: 'First option description'
			},
			{
				id: 'option2',
				label: 'Option 2',
				value: 'option2',
				description: 'Second option description'
			},
			{
				id: 'option3',
				label: 'Option 3',
				value: 'option3',
				description: 'Third option description'
			},
			{
				id: 'option4',
				label: 'Option 4',
				value: 'option4',
				description: 'Fourth option description'
			}
		],
		value: [],
		label: 'Select your preferences',
		description: 'Choose one or more options',
		disabled: false,
		required: false
	},
	controls: {
		label: { type: 'text', description: 'Label for the checkbox group' },
		description: { type: 'text', description: 'Description for the checkbox group' },
		disabled: { type: 'boolean', description: 'Whether the checkbox group is disabled' },
		required: { type: 'boolean', description: 'Whether the checkbox group is required' }
	},
	presets: { Preselected: { value: ['option1', 'option3'] } }
} satisfies ContractStory<RecipeCheckboxGroup>;
