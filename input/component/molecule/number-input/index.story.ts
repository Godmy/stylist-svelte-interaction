import NumberInput from './index.svelte';
import type { RecipeNumberInput } from '$stylist/input/interface/recipe/number-input';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Numeric input with increment/decrement controls. */
export default {
	component: NumberInput,
	title: 'NumberInput',
	description: 'Numeric input with increment/decrement controls.',
	args: { value: 10, min: 0, max: 100, step: 1, disabled: false, readonly: false },
	controls: {
		min: { type: 'number', min: -100, max: 100, step: 1 },
		max: { type: 'number', min: 1, max: 500, step: 1 },
		step: { type: 'number', min: 1, max: 50, step: 1 },
		disabled: { type: 'boolean' },
		readonly: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeNumberInput>;
