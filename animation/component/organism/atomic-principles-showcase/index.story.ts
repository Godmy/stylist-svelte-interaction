import AtomicPrinciplesShowcase from './index.svelte';
import type { RecipeAtomicPrinciplesShowcase } from '$stylist/animation/interface/recipe/atomic-principles-showcase';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Landing block that presents atomic architecture levels with highlighted counters. */
export default {
	component: AtomicPrinciplesShowcase,
	title: 'Atomic Principles Showcase',
	description: 'Landing block that presents atomic architecture levels with highlighted counters.',
	args: {
		stats: { atoms: 180, molecules: 90, organisms: 50 },
		title: 'Built on Atomic Principles',
		description: 'Every component follows the proven Atomic Design methodology'
	},
	controls: {
		title: { type: 'text' },
		description: { type: 'text' }
	},
	presets: {
		'Small library': { stats: { atoms: 24, molecules: 12, organisms: 4 } }
	}
} satisfies ContractStory<RecipeAtomicPrinciplesShowcase>;
