import RadioButtonGroup from '$stylist/input/component/molecule/radio-button-group/index.svelte';
import type { RecipeRadioButtonGroup } from '$stylist/input/interface/recipe/radio-button-group';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** A group of radio buttons for single selection. */
export default {
	component: RadioButtonGroup,
	title: 'RadioButtonGroup',
	description: 'A group of radio buttons for single selection',
	args: {
		options: [
			{ value: 'small', label: 'Small' },
			{ value: 'medium', label: 'Medium' },
			{ value: 'large', label: 'Large' },
			{ value: 'xlarge', label: 'Extra Large' }
		],
		name: 'story-radio-button-group',
		value: 'medium',
		disabled: false,
		required: false
	},
	controls: {
		value: { type: 'select', options: ['small', 'medium', 'large', 'xlarge'] },
		disabled: { type: 'boolean', description: 'Whether the radio button group is disabled' },
		required: { type: 'boolean', description: 'Whether the radio button group is required' }
	}
} satisfies ContractStory<RecipeRadioButtonGroup>;
