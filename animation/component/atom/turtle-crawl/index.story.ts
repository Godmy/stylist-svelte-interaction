import TurtleCrawl from '$stylist/animation/component/atom/turtle-crawl/index.svelte';
import type { RecipeTurtleCrawl } from '$stylist/animation/interface/recipe/turtle-crawl';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** A turtle silhouette paddling across the shore toward the water. */
export default {
	component: TurtleCrawl,
	title: 'TurtleCrawl',
	description:
		'A turtle silhouette paddling across the shore toward the water, looping. Respects prefers-reduced-motion.',
	args: { tone: '#3f6f46', still: false },
	controls: {
		tone: { type: 'color' },
		still: { type: 'boolean' }
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: {
			style:
				'display: grid; align-content: center; min-height: 12rem; padding: 2rem; overflow: hidden; border: 1px solid var(--color-border-primary); border-radius: 0.5rem; background: linear-gradient(180deg, #f7f3ec, #cdeef0);'
		},
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeTurtleCrawl>;
