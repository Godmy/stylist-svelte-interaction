import VectorScene from '$stylist/animation/component/atom/vector-scene/index.svelte';
import type { RecipeVectorScene } from '$stylist/animation/interface/recipe/vector-scene';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Three independent modes for the same layered SVG scene. */
export default {
	component: VectorScene,
	title: 'VectorScene',
	description:
		'Three independent modes for the same layered SVG scene: ambient drifts on its own, progress follows the progress control, interaction reacts to hover and press. Respects prefers-reduced-motion.',
	args: {
		mode: 'progress',
		viewBox: '0 0 100 100',
		layers: [
			{
				id: 'wave-back',
				d: 'M0 62 Q 25 48 50 62 T 100 62 V100 H0 Z',
				fill: 'color-mix(in srgb, var(--color-info-500) 55%, transparent)'
			},
			{
				id: 'wave-front',
				d: 'M0 74 Q 25 64 50 74 T 100 74 V100 H0 Z',
				fill: 'color-mix(in srgb, var(--color-info-500) 85%, transparent)'
			}
		],
		progress: 0.5,
		animateOnHover: true,
		animateOnClick: true
	},
	controls: {
		// Scene modes of the behavior union; no token lists them.
		mode: { type: 'select', options: ['ambient', 'progress', 'interaction'] },
		progress: { type: 'range', min: 0, max: 1, step: 0.01 },
		animateOnHover: { type: 'boolean' },
		animateOnClick: { type: 'boolean' }
	},
	presets: {
		Ambient: { mode: 'ambient' },
		Progress: { mode: 'progress' },
		Interaction: { mode: 'interaction' }
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: {
			style:
				'display: grid; place-items: center; min-height: 12rem; padding: 1.5rem; background: var(--color-background-secondary); border: 1px solid var(--color-border-primary); border-radius: 0.5rem;'
		},
		children: [
			{
				kind: 'element',
				tag: 'div',
				attrs: { style: 'width: 100%; height: 8rem;' },
				children: [{ kind: 'outlet' }]
			}
		]
	}
} satisfies ContractStory<RecipeVectorScene>;
