import AnimatedDigit from '$stylist/animation/component/atom/animated-digit/index.svelte';
import type { RecipeAnimatedDigit } from '$stylist/animation/interface/recipe/animated-digit';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Story-only knobs: the render builds `format` and the inline style from them. */
type Knobs = { prefix?: string; suffix?: string; fontSize?: number; color?: string };

/** Animates a numeric value and renders the formatted result. */
export default {
	component: AnimatedDigit,
	title: 'AnimatedDigit',
	description: 'Animates a numeric value and renders the formatted result.',
	args: { from: 1250, to: 9875, fontSize: 56, color: '#2563eb', prefix: '$', suffix: '' },
	controls: {
		from: { type: 'number' },
		to: { type: 'number' },
		fontSize: { type: 'range', min: 16, max: 112, step: 2 },
		color: { type: 'color' },
		prefix: { type: 'text' },
		suffix: { type: 'text' }
	}
} satisfies ContractStory<RecipeAnimatedDigit & Knobs>;
