import WhaleSpout from './index.svelte';
import type { RecipeWhaleSpout } from '$stylist/animation/interface/recipe/whale-spout';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** A whale breaking the surface with a periodic blow spout. */
export default {
	component: WhaleSpout,
	title: 'WhaleSpout',
	description:
		'A whale breaking the surface with a periodic blow spout. Respects prefers-reduced-motion.',
	args: { tone: '#1f4959', spoutTone: '#d8f2f5', still: false },
	controls: {
		tone: { type: 'color' },
		spoutTone: { type: 'color' },
		still: { type: 'boolean' }
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: {
			style:
				'display: grid; place-items: center; padding: 2rem; border: 1px solid var(--color-border-primary); border-radius: 0.5rem; min-height: 14rem; background: linear-gradient(180deg, #cdeef0, #0e5c63);'
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
} satisfies ContractStory<RecipeWhaleSpout>;
