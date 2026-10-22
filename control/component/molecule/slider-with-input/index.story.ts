import SliderWithInput from '$stylist/control/component/molecule/slider-with-input/index.svelte';
import type { RecipeSliderWithInput } from '$stylist/control/interface/recipe/slider-with-input';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Slider with input component for value selection. */
export default {
	component: SliderWithInput,
	title: 'SliderWithInput',
	description: 'Slider with input component for value selection',
	args: { min: 0, max: 100, step: 1, value: 50, disabled: false },
	controls: {
		min: { type: 'number', description: 'Minimum value' },
		max: { type: 'number', description: 'Maximum value' },
		step: { type: 'number', description: 'Step increment' },
		value: { type: 'number', description: 'Current value' },
		disabled: { type: 'boolean', description: 'Whether the component is disabled' }
	}
} satisfies ContractStory<RecipeSliderWithInput>;
