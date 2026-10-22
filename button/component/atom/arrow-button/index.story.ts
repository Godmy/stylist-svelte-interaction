import ArrowButton from '$stylist/button/component/atom/arrow-button/index.svelte';
import type { RecipeArrowButton } from '$stylist/button/interface/recipe/arrow-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** AnimatedButton with the `arrow` effect. */
export default {
	component: ArrowButton,
	title: 'Arrow Button',
	description: 'Animated CTA with keyboard focus, loading, disabled and reduced-motion support.',
	args: { disabled: false, loading: false },
	controls: {
		disabled: { type: 'boolean' },
		loading: { type: 'boolean' }
	},
	content: [{ kind: 'text', value: 'Посмотреть программу' }],
	layout: 'centered'
} satisfies ContractStory<RecipeArrowButton>;
