import PalmSway from './index.svelte';
import type { RecipePalmSway } from '$stylist/animation/interface/recipe/palm-sway';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Ambient swaying palm silhouette. */
export default {
	component: PalmSway,
	title: 'PalmSway',
	description: 'Ambient swaying palm silhouette. Respects prefers-reduced-motion.',
	args: { tone: '#2f6b4f', flip: false, still: false },
	controls: {
		tone: { type: 'color' },
		flip: { type: 'boolean' },
		still: { type: 'boolean' }
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: {
			style:
				'display: grid; place-items: center; padding: 2rem; border: 1px solid var(--color-border-primary); border-radius: 0.5rem; min-height: 18rem; background: linear-gradient(180deg, #cdeef0, #f7f3ec); --palm-sway-size: 12rem;'
		},
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipePalmSway>;
