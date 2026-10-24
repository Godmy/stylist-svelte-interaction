import FeedbackScenario from '$stylist/form/component/page/feedback-scenario/index.svelte';
import type { RecipeFeedbackScenario } from '$stylist/form/interface/recipe/feedback-scenario';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Rating card with its settings panel; the page receives the submitted score. */
export default {
	component: FeedbackScenario,
	title: 'FeedbackScenario',
	description: 'Choosing, submitting and confirming a rating in two tones.',
	args: { title: 'Оценка и обратная связь' },
	controls: { title: { type: 'text' } },
	layout: 'padded'
} satisfies ContractStory<RecipeFeedbackScenario>;
