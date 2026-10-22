import Stepper from '$stylist/control/component/atom/stepper/index.svelte';
import type { RecipeStepper } from '$stylist/control/interface/recipe/stepper';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Numeric stepper with -/+ buttons and a clamped number input. */
export default {
	component: Stepper,
	title: 'Stepper',
	description: 'Numeric stepper with -/+ buttons and a clamped number input.',
	args: { label: 'Adults', value: 2, min: 1, max: 12, step: 1, disabled: false },
	controls: {
		value: { type: 'number' },
		min: { type: 'number' },
		max: { type: 'number' },
		step: { type: 'number', min: 1 },
		label: { type: 'text' },
		disabled: { type: 'boolean' }
	},
	presets: {
		Children: { label: 'Children', value: 0, min: 0, max: 8 },
		Disabled: { label: 'Disabled quantity', value: 4, disabled: true }
	}
} satisfies ContractStory<RecipeStepper>;
