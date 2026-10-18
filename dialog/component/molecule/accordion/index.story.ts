import Accordion from './index.svelte';
import type { RecipeAccordion } from '$stylist/dialog/interface/recipe/accordion';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Single-open accordion; index.story.svelte fills it with three AccordionLayout items. */
export default {
	component: Accordion,
	title: 'Accordion',
	description: 'Открывает один AccordionLayout — при клике на другой закрывает предыдущий',
	args: {
		defaultValue: ''
	},
	controls: {
		defaultValue: { type: 'text', description: 'Value of the initially open item (section-1…3)' }
	}
} satisfies ContractStory<RecipeAccordion>;
