import Tick from '$stylist/control/component/atom/tick/index.svelte';
import type { RecipeTick } from '$stylist/control/interface/recipe/tick';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Slider tick mark component. */
export default {
	component: Tick,
	title: 'Tick',
	description: 'Slider tick mark component',
	args: { value: 50, position: 50, label: '50%', active: true },
	controls: {
		value: { type: 'number', min: 0, max: 100, step: 1 },
		position: { type: 'range', min: 0, max: 100, step: 1 },
		label: { type: 'text' },
		active: { type: 'boolean' }
	},
	// The tick is absolutely positioned along a slider track.
	context: {
		kind: 'element',
		tag: 'div',
		attrs: {
			style:
				'position: relative; height: 2.5rem; width: 100%; border: 1px dashed var(--color-border-secondary); padding: 0 0.5rem'
		},
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeTick>;
