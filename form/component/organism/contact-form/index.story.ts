import StoryComponent from '$stylist/form/component/organism/contact-form/index.svelte';
import type { RecipeContactForm } from '$stylist/form/interface/recipe/contact-form';
import type { ContractStory } from '$stylist/html/interface/contract/story';
export default {
	component: StoryComponent,
	title: 'ContactForm',
	description:
		'Standalone contact fields, consent, feedback and host form attachment; no application routing dependency.',
	args: {
		topicLabel: 'Product discussion',
		topicValue: 'product',
		initialMessage: 'I would like to discuss a project.'
	}
} satisfies ContractStory<RecipeContactForm>;
