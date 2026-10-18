import RangeInput from './index.svelte';
import type { RecipeRangeInput } from '$stylist/control/interface/recipe/range-input';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** A range input component with dual sliders. */
export default {
	component: RangeInput,
	title: 'RangeInput',
	description: 'A range input component with dual sliders.',
	args: {
		min: 0,
		max: 500,
		minValue: 50,
		maxValue: 350,
		step: 1,
		disabled: false,
		showInputFields: true
	},
	controls: {
		min: { type: 'number' },
		max: { type: 'number' },
		step: { type: 'number', min: 1 },
		disabled: { type: 'boolean' },
		showInputFields: { type: 'boolean' }
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: { style: 'max-width: 28rem' },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeRangeInput>;
