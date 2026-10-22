import BeachWater from '$stylist/animation/component/atom/beach-water/index.svelte';
import type { RecipeBeachWater } from '$stylist/animation/interface/recipe/beach-water';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Transparent-top white wave divider with three drifting foam layers. */
export default {
	component: BeachWater,
	title: 'BeachWater',
	description:
		'Transparent-top white wave divider with three foam layers drifting at different speeds. Respects prefers-reduced-motion.',
	args: {
		waveStart: 0.46,
		amplitude: 44,
		layerOffset: 18,
		backColor: '#ffffff',
		middleColor: '#ffffff',
		frontColor: '#ffffff',
		still: false
	},
	controls: {
		waveStart: { type: 'range', min: 0.12, max: 0.82, step: 0.02 },
		amplitude: { type: 'range', min: 8, max: 78, step: 2 },
		layerOffset: { type: 'range', min: 0, max: 42, step: 2 },
		backColor: { type: 'color' },
		middleColor: { type: 'color' },
		frontColor: { type: 'color' },
		still: { type: 'boolean' }
	},
	// Checkered stage so the transparent top of the white waves stays visible.
	context: {
		kind: 'element',
		tag: 'div',
		attrs: {
			style:
				'display: flex; flex-direction: column; justify-content: flex-end; min-height: 18rem; overflow: hidden; border: 1px solid var(--color-border-primary); border-radius: 0.5rem; --beach-water-height: 11rem; background: linear-gradient(45deg, rgba(15, 23, 42, 0.07) 25%, transparent 25%), linear-gradient(-45deg, rgba(15, 23, 42, 0.07) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(15, 23, 42, 0.07) 75%), linear-gradient(-45deg, transparent 75%, rgba(15, 23, 42, 0.07) 75%); background-position: 0 0, 0 12px, 12px -12px, -12px 0; background-size: 24px 24px;'
		},
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeBeachWater>;
