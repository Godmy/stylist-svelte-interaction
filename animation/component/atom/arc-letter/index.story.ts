import ArcLetter from './index.svelte';
import type { RecipeArcLetter } from '$stylist/animation/interface/recipe/arc-letter';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Single absolutely-positioned letter for animated arc typography. */
export default {
	component: ArcLetter,
	title: 'ArcLetter',
	description: 'Single absolutely-positioned letter for animated arc typography.',
	args: { character: 'L', x: 180, y: 120, opacity: 1, rotation: -14, scale: 2.2, highlight: 0.75 },
	controls: {
		character: { type: 'text' },
		x: { type: 'range', min: 40, max: 320, step: 5 },
		y: { type: 'range', min: 40, max: 220, step: 5 },
		opacity: { type: 'range', min: 0, max: 1, step: 0.05 },
		rotation: { type: 'range', min: -90, max: 90, step: 1 },
		scale: { type: 'range', min: 0.5, max: 4, step: 0.1 },
		highlight: { type: 'range', min: 0, max: 1, step: 0.05 }
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: {
			style:
				'position: relative; width: min(100%, 24rem); height: 16rem; overflow: hidden; border: 1px solid var(--color-border-primary); border-radius: 0.5rem; background: linear-gradient(180deg, #f7f3ec, #d6eef0); font-size: 3rem;'
		},
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeArcLetter>;
