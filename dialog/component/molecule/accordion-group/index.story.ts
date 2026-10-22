import AccordionGroup from '$stylist/dialog/component/molecule/accordion-group/index.svelte';
import type { RecipeAccordionGroup } from '$stylist/dialog/interface/recipe/accordion-group';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Multi-open accordion; index.story.svelte fills it with three AccordionLayout items. */
export default {
	component: AccordionGroup,
	title: 'AccordionGroup',
	description: 'Каждый AccordionLayout открывается и закрывается независимо',
	args: {
		defaultValues: ['section-1']
	}
} satisfies ContractStory<RecipeAccordionGroup>;
