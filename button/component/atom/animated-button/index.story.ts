import AnimatedButton from './index.svelte';
import type { RecipeAnimatedButton } from '$stylist/button/interface/recipe/animated-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Animated CTA button with switchable effects. */
export default {
	component: AnimatedButton,
	title: 'Animated Button',
	description: 'Animated CTA with keyboard focus, loading, disabled and reduced-motion support.',
	args: { effect: 'shine', attention: true, disabled: false, loading: false },
	controls: {
		effect: { type: 'select', options: ['shine', 'glow', 'fill', 'arrow', 'selection', 'morph'] },
		attention: { type: 'boolean' },
		disabled: { type: 'boolean' },
		loading: { type: 'boolean' }
	},
	presets: { Arrow: { effect: 'arrow' }, Loading: { loading: true } },
	content: [{ kind: 'text', value: 'Посмотреть программу' }],
	layout: 'centered'
} satisfies ContractStory<RecipeAnimatedButton>;
