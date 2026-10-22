import GlowButton from '$stylist/button/component/atom/glow-button/index.svelte';
import type { RecipeGlowButton } from '$stylist/button/interface/recipe/glow-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** AnimatedButton with the `glow` effect. */
export default {
	component: GlowButton,
	title: 'Glow Button',
	description: 'Animated CTA with keyboard focus, loading, disabled and reduced-motion support.',
	args: { disabled: false, loading: false },
	controls: {
		disabled: { type: 'boolean' },
		loading: { type: 'boolean' }
	},
	content: [{ kind: 'text', value: 'Посмотреть программу' }],
	layout: 'centered'
} satisfies ContractStory<RecipeGlowButton>;
