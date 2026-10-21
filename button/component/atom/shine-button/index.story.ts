import ShineButton from './index.svelte';
import type { RecipeShineButton } from '$stylist/button/interface/recipe/shine-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** AnimatedButton with the `shine` effect and an animated border. */
export default {
	component: ShineButton,
	title: 'Shine Button',
	description:
		'Continuous border highlights and a light pass every five seconds. Both effects can be disabled independently; respects reduced motion.',
	args: { attention: true, animatedBorder: true, disabled: false, loading: false },
	controls: {
		attention: { type: 'boolean' },
		animatedBorder: { type: 'boolean' },
		disabled: { type: 'boolean' },
		loading: { type: 'boolean' }
	},
	content: [{ kind: 'text', value: 'Посмотреть программу' }],
	layout: 'centered'
} satisfies ContractStory<RecipeShineButton>;
