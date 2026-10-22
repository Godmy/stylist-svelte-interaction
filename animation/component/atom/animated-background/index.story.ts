import AnimatedBackground from '$stylist/animation/component/atom/animated-background/index.svelte';
import type { RecipeAnimatedBackground } from '$stylist/animation/interface/recipe/animated-background';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/**
 * Story-only knobs: the render turns them into the component's
 * `--animated-background-*-duration` (seconds) and `-opacity` (percent) custom properties.
 */
type Knobs = {
	shapeSeconds?: number;
	orbSeconds?: number;
	particleSeconds?: number;
	shapeOpacity?: number;
	orbOpacity?: number;
	particleOpacity?: number;
};

/** Ambient animated background with tunable shape, orb, and particle motion. */
export default {
	component: AnimatedBackground,
	title: 'AnimatedBackground',
	description: 'Ambient animated background with tunable shape, orb, and particle motion.',
	args: {
		shapeSeconds: 16,
		orbSeconds: 14,
		particleSeconds: 22,
		shapeOpacity: 45,
		orbOpacity: 50,
		particleOpacity: 32,
		class: ''
	},
	controls: {
		shapeSeconds: { type: 'range', min: 4, max: 32, step: 1 },
		orbSeconds: { type: 'range', min: 4, max: 30, step: 1 },
		particleSeconds: { type: 'range', min: 6, max: 44, step: 1 },
		shapeOpacity: { type: 'range', min: 0, max: 100, step: 5 },
		orbOpacity: { type: 'range', min: 0, max: 100, step: 5 },
		particleOpacity: { type: 'range', min: 0, max: 100, step: 4 },
		class: { type: 'text' }
	}
} satisfies ContractStory<RecipeAnimatedBackground & Knobs>;
