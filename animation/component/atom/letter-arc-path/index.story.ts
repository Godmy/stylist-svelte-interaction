import LetterArcPath from './index.svelte';
import type { RecipeLetterArcPath } from '$stylist/animation/interface/recipe/letter-arc-path';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Guide and progress stroke for letters travelling along an arc. */
export default {
	component: LetterArcPath,
	title: 'LetterArcPath',
	description: 'Guide and progress stroke for letters travelling along an arc.',
	args: {
		points: [
			{ x: 60, y: 210 },
			{ x: 180, y: 92 },
			{ x: 360, y: 62 },
			{ x: 540, y: 92 },
			{ x: 660, y: 210 }
		],
		width: 720,
		height: 280,
		progress: 0.55
	},
	controls: {
		progress: { type: 'range', min: 0, max: 1, step: 0.01 }
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: {
			style:
				'position: relative; width: min(100%, 45rem); height: 280px; overflow: hidden; border: 1px solid var(--color-border-primary); border-radius: 0.5rem; background: linear-gradient(90deg, rgba(15, 23, 42, 0.06) 1px, transparent 1px), linear-gradient(180deg, rgba(15, 23, 42, 0.06) 1px, transparent 1px), #f7f3ec; background-size: 32px 32px;'
		},
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeLetterArcPath>;
