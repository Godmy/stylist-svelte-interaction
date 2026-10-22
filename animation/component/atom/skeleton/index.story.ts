import Skeleton from '$stylist/animation/component/atom/skeleton/index.svelte';
import type { RecipeSkeleton } from '$stylist/animation/interface/recipe/skeleton';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Neutral placeholder for unavailable information. */
export default {
	component: Skeleton,
	title: 'Skeleton',
	description: 'Neutral placeholder for unavailable information.',
	args: { variant: 'text', lines: 3, animated: true },
	controls: {
		// Skeleton shapes; the recipe union matches no shared token.
		variant: { type: 'select', options: ['text', 'rectangle', 'circle'] },
		lines: { type: 'range', min: 1, max: 6, step: 1 },
		animated: { type: 'boolean' }
	},
	presets: {
		Circle: { variant: 'circle' },
		Rectangle: { variant: 'rectangle', height: 64 }
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: { style: 'max-width: 28rem;' },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeSkeleton>;
