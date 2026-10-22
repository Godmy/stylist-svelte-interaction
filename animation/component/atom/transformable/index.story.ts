import Transformable from '$stylist/animation/component/atom/transformable/index.svelte';
import type { RecipeTransformable } from '$stylist/animation/interface/recipe/transformable';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Applies transform contracts and optional hover or press motion. */
export default {
	component: Transformable,
	title: 'Transformable',
	description: 'Applies transform contracts and optional hover or press motion.',
	args: {
		scale: 1.08,
		rotate: 6,
		translateY: -6,
		translateX: 0,
		skewX: 0,
		skewY: 0,
		transformOrigin: 'center center',
		animateOnHover: true,
		animateOnClick: false
	},
	controls: {
		scale: { type: 'range', min: 0.7, max: 1.4, step: 0.01 },
		rotate: { type: 'range', min: -20, max: 20, step: 1 },
		translateY: { type: 'range', min: -24, max: 24, step: 1 },
		animateOnHover: { type: 'boolean' },
		animateOnClick: { type: 'boolean' }
	},
	content: [
		{
			kind: 'element',
			tag: 'div',
			attrs: {
				style:
					'display: grid; gap: 0.5rem; width: min(100%, 18rem); max-width: 18rem; padding: 1.5rem; text-align: center; background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary-600) 12%, transparent), transparent 48%), var(--color-background-primary); border: 1px solid color-mix(in srgb, var(--color-primary-600) 26%, var(--color-border-primary)); border-radius: 0.5rem; box-shadow: 0 1rem 2rem color-mix(in srgb, var(--color-text-primary) 12%, transparent);'
			},
			children: [
				{
					kind: 'element',
					tag: 'strong',
					attrs: { style: 'color: var(--color-text-primary);' },
					children: [{ kind: 'text', value: 'Hover the card' }]
				},
				{
					kind: 'element',
					tag: 'p',
					attrs: {
						style: 'color: var(--color-text-secondary); font-size: 0.875rem; line-height: 1.25rem;'
					},
					children: [{ kind: 'text', value: 'Use the controls to change the motion contract.' }]
				}
			]
		}
	],
	context: {
		kind: 'element',
		tag: 'div',
		attrs: {
			style:
				'display: grid; min-height: 18rem; place-items: center; padding: 2rem; background: linear-gradient(90deg, color-mix(in srgb, var(--color-border-primary) 68%, transparent) 1px, transparent 1px), linear-gradient(color-mix(in srgb, var(--color-border-primary) 68%, transparent) 1px, transparent 1px), var(--color-background-secondary); background-size: 2rem 2rem, 2rem 2rem, auto; border: 1px solid var(--color-border-primary); border-radius: 0.5rem;'
		},
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeTransformable>;
