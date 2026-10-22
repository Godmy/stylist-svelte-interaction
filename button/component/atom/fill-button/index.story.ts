import FillButton from '$stylist/button/component/atom/fill-button/index.svelte';
import type { RecipeFillButton } from '$stylist/button/interface/recipe/fill-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** AnimatedButton with the `fill` effect. */
export default {
	component: FillButton,
	title: 'Fill Button',
	description: 'Animated CTA with keyboard focus, loading, disabled and reduced-motion support.',
	args: { disabled: false, loading: false },
	controls: {
		disabled: { type: 'boolean' },
		loading: { type: 'boolean' }
	},
	content: [{ kind: 'text', value: 'Посмотреть программу' }],
	layout: 'centered'
} satisfies ContractStory<RecipeFillButton>;
