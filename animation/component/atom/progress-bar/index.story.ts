import ProgressBar from './index.svelte';
import type { RecipeProgressBar } from '$stylist/animation/interface/recipe/progress-bar';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** General purpose progress indicator. */
export default {
	component: ProgressBar,
	title: 'ProgressBar',
	description: 'General purpose progress indicator.',
	args: { label: 'Progress', value: 64, max: 100 },
	controls: {
		label: { type: 'text' },
		value: { type: 'range', min: 0, max: 100, step: 1 },
		max: { type: 'number' }
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: { style: 'max-width: 32rem;' },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeProgressBar>;
