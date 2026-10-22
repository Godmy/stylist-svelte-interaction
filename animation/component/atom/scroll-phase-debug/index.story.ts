import ScrollPhaseDebug from '$stylist/animation/component/atom/scroll-phase-debug/index.svelte';
import type { RecipeScrollPhaseDebug } from '$stylist/animation/interface/recipe/scroll-phase-debug';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Fixed debug overlay for scroll-driven animation phases. */
export default {
	component: ScrollPhaseDebug,
	title: 'ScrollPhaseDebug',
	description: 'Fixed debug overlay for scroll-driven animation phases.',
	args: { progress: 0.42, phase: 'morph', webgl: true, reducedMotion: false },
	controls: {
		progress: { type: 'range', min: 0, max: 1, step: 0.01 },
		// Phase names of the scroll sequence; no token lists them.
		phase: { type: 'select', options: ['intro', 'focus', 'morph', 'logo', 'complete'] },
		webgl: { type: 'boolean' },
		reducedMotion: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeScrollPhaseDebug>;
