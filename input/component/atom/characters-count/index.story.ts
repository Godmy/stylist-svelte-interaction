import CharactersCount from '$stylist/input/component/atom/characters-count/index.svelte';
import type { RecipeCharactersCount } from '$stylist/input/interface/recipe/characters-count';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Character progress indicator for text fields. */
export default {
	component: CharactersCount,
	title: 'CharactersCount',
	description: 'Character progress indicator for text fields.',
	args: { max: 120, showPercentage: true, disabled: false },
	controls: {
		max: { type: 'number', min: 1, max: 500, step: 1 },
		showPercentage: { type: 'boolean' },
		// Story knob: disables the demo textarea whose length is counted.
		disabled: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeCharactersCount & { disabled?: boolean }>;
