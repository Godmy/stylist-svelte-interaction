import RangeSlider from '$stylist/control/component/molecule/range-slider/index.svelte';
import type { RecipeRangeSlider } from '$stylist/control/interface/recipe/range-slider';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** A slider component for selecting values or ranges. */
export default {
	component: RangeSlider,
	title: 'RangeSlider',
	description: 'A slider component for selecting values or ranges',
	args: {
		id: 'volume-slider',
		value: 50,
		label: 'Volume',
		min: 0,
		max: 100,
		step: 1,
		showValue: true,
		disabled: false,
		range: false,
		description: 'Adjust the volume level'
	},
	controls: {
		label: { type: 'text', description: 'Label for the slider' },
		min: { type: 'number', description: 'Minimum value' },
		max: { type: 'number', description: 'Maximum value' },
		step: { type: 'number', description: 'Step increment' },
		showValue: { type: 'boolean', description: 'Whether to show the current value' },
		disabled: { type: 'boolean', description: 'Whether the slider is disabled' },
		range: { type: 'boolean', description: 'Whether to use range mode' },
		description: { type: 'text', description: 'Description for the slider' }
	}
} satisfies ContractStory<RecipeRangeSlider>;
