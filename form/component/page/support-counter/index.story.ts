import SupportCounter from '$stylist/form/component/page/support-counter/index.svelte';
import type { RecipeSupportCounter } from '$stylist/form/interface/recipe/support-counter';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Counter with a five second pause between accepted actions. */
export default {
	component: SupportCounter,
	title: 'SupportCounter',
	description: 'Action, shared counter and rate limit.',
	args: { title: 'Счётчик с паузой' },
	controls: { title: { type: 'text' } },
	layout: 'padded'
} satisfies ContractStory<RecipeSupportCounter>;
