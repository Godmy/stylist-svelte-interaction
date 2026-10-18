import LayoutTransformation from './index.svelte';
import type { RecipeLayoutTransformation } from '$stylist/animation/interface/recipe/layout-transformation';
import type { ContractStory } from '$stylist/html/interface/contract/story';

const muted = 'color: var(--color-text-secondary); font-size: 0.75rem; line-height: 1rem;';

/** Atom for visible CSS transforms. */
export default {
	component: LayoutTransformation,
	title: 'Transformation Component',
	description: 'Atom for visible CSS transforms: scale, rotate, translate, and origin.',
	args: {
		scale: 1,
		rotate: 0,
		translateX: 0,
		translateY: 0,
		transformOrigin: 'center',
		animateOnHover: false,
		animateOnClick: false,
		disabled: false
	},
	controls: {
		scale: { type: 'range', min: 0.5, max: 2, step: 0.1 },
		rotate: { type: 'range', min: 0, max: 360, step: 15 },
		translateX: { type: 'range', min: -100, max: 100, step: 10 },
		translateY: { type: 'range', min: -100, max: 100, step: 10 },
		// CSS transform-origin keywords; no token lists them.
		transformOrigin: {
			type: 'select',
			options: [
				'center',
				'top',
				'bottom',
				'left',
				'right',
				'top left',
				'top right',
				'bottom left',
				'bottom right'
			]
		},
		animateOnHover: { type: 'boolean' },
		animateOnClick: { type: 'boolean' },
		disabled: { type: 'boolean' }
	},
	presets: {
		Scaled: { scale: 1.4 },
		Rotated: { rotate: 45, transformOrigin: 'top left' },
		Shifted: { translateX: 40, translateY: -20 }
	},
	content: [
		{
			kind: 'element',
			tag: 'div',
			attrs: {
				style:
					'display: grid; gap: 0.375rem; width: 12rem; min-height: 8rem; padding: 1.5rem; text-align: center; background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary-600) 14%, transparent), transparent 46%), var(--color-background-primary); border: 1px solid var(--color-border-primary); border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);'
			},
			children: [
				{
					kind: 'element',
					tag: 'p',
					attrs: { style: 'color: var(--color-text-primary); font-weight: 700;' },
					children: [{ kind: 'text', value: 'Transform card' }]
				},
				{
					kind: 'element',
					tag: 'p',
					attrs: { style: muted },
					children: [{ kind: 'text', value: 'Use the controls to scale, rotate and move it.' }]
				}
			]
		}
	],
	context: {
		kind: 'element',
		tag: 'div',
		attrs: {
			style:
				'display: flex; min-height: 18rem; align-items: center; justify-content: center; overflow: hidden; background: linear-gradient(90deg, color-mix(in srgb, var(--color-border-primary) 70%, transparent) 1px, transparent 1px), linear-gradient(color-mix(in srgb, var(--color-border-primary) 70%, transparent) 1px, transparent 1px), var(--color-background-tertiary); background-size: 2rem 2rem; border: 1px solid var(--color-border-primary); border-radius: 0.5rem;'
		},
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeLayoutTransformation>;
