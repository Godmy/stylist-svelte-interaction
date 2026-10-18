import WaveSurf from './index.svelte';
import type { RecipeWaveSurf } from '$stylist/animation/interface/recipe/wave-surf';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Breaking wave with a tiny surfer silhouette riding the crest. */
export default {
	component: WaveSurf,
	title: 'WaveSurf',
	description:
		'Breaking wave with a tiny surfer silhouette riding the crest. Respects prefers-reduced-motion.',
	args: { tone: '#1a8a86', riderTone: '#17231f', still: false },
	controls: {
		tone: { type: 'color' },
		riderTone: { type: 'color' },
		still: { type: 'boolean' }
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: {
			style:
				'display: grid; place-items: center; padding: 2rem; border: 1px solid var(--color-border-primary); border-radius: 0.5rem; min-height: 14rem; background: linear-gradient(180deg, #cdeef0, #f7f3ec);'
		},
		children: [
			{
				kind: 'element',
				tag: 'div',
				attrs: { style: 'width: 100%; max-width: 20rem;' },
				children: [{ kind: 'outlet' }]
			}
		]
	}
} satisfies ContractStory<RecipeWaveSurf>;
