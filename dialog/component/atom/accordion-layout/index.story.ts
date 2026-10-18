import AccordionLayout from './index.svelte';
import type { RecipeAccordionLayout } from '$stylist/dialog/interface/recipe/accordion-layout';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Accordion building block; index.story.svelte places it inside Accordion and AccordionGroup. */
export default {
	component: AccordionLayout,
	title: 'AccordionLayout',
	description: 'Базовый строительный блок accordion — заголовок + панель с контентом',
	args: {
		value: 'a',
		title: 'Accordion Item',
		// Story knob: text of the item's panel (its children snippet), drawn by the render.
		panelText: 'Panel content goes here.',
		disabled: false
	},
	controls: {
		title: { type: 'text' },
		panelText: { type: 'text', label: 'content' },
		disabled: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeAccordionLayout & { panelText?: string }>;
