import Tooltip from '$stylist/animation/component/atom/tooltip/index.svelte';
import type { RecipeTooltip } from '$stylist/animation/interface/recipe/tooltip';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_ALIGNMENT } from '$stylist/layout/const/array/alignment';
import { TOKEN_TRIGGER } from '$stylist/layout/const/array/trigger';
import { TOKEN_CONNECTOR } from '$stylist/animation/const/array/connector';

/** Context helper with trigger, placement, and variant controls. */
export default {
	component: Tooltip,
	title: 'Tooltip',
	description: 'Context helper with trigger, placement, and variant controls.',
	args: {
		content: 'Helpful contextual info',
		placement: 'top',
		trigger: 'hover',
		variant: 'arrow',
		delay: 0,
		disabled: false
	},
	controls: {
		content: { type: 'text' },
		placement: { type: 'select', options: TOKEN_ALIGNMENT },
		trigger: { type: 'select', options: TOKEN_TRIGGER },
		// `arrow` adds a pointer, `invisible` hides the popup chrome; the rest draw the plain line style.
		variant: { type: 'select', options: TOKEN_CONNECTOR },
		delay: { type: 'number', min: 0, max: 1200, step: 50 },
		disabled: { type: 'boolean' }
	},
	presets: {
		Click: { trigger: 'click', placement: 'bottom' },
		Line: { variant: 'line', placement: 'right' }
	},
	// The tooltip renders its own trigger button around the content.
	content: [{ kind: 'text', value: 'Target element' }],
	context: {
		kind: 'element',
		tag: 'div',
		attrs: {
			style:
				'display: flex; min-height: 10rem; align-items: center; justify-content: center; padding: 2rem; background: linear-gradient(90deg, color-mix(in srgb, var(--color-border-primary) 62%, transparent) 1px, transparent 1px), linear-gradient(color-mix(in srgb, var(--color-border-primary) 62%, transparent) 1px, transparent 1px), var(--color-background-secondary); background-size: 2rem 2rem; border: 1px dashed var(--color-border-primary); border-radius: 0.5rem;'
		},
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeTooltip>;
