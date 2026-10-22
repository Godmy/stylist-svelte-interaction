import ComponentLibraryStats from '$stylist/animation/component/organism/component-library-stats/index.svelte';
import type { RecipeComponentLibraryStats } from '$stylist/animation/interface/recipe/component-library-stats';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Animated counters for total components and architecture levels. */
export default {
	component: ComponentLibraryStats,
	title: 'Component Library Stats',
	description: 'Animated counters for total components and architecture levels.',
	args: {
		stats: { totalComponents: 320, atoms: 180, molecules: 90, organisms: 50 },
		animateOnVisible: true,
		durationMs: 2000
	},
	controls: {
		animateOnVisible: { type: 'boolean' },
		durationMs: { type: 'number', min: 200, max: 6000, step: 100 }
	},
	presets: {
		'Small library': { stats: { totalComponents: 40, atoms: 24, molecules: 12, organisms: 4 } }
	}
} satisfies ContractStory<RecipeComponentLibraryStats>;
