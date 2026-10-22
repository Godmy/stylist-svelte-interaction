import FloatingIcon from '$stylist/animation/component/atom/floating-icon/index.svelte';
import type { RecipeFloatingIcon } from '$stylist/animation/interface/recipe/floating-icon';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';

/** Gradient icon tile with an idle float animation. */
export default {
	component: FloatingIcon,
	title: 'FloatingIcon',
	description:
		'Gradient icon tile with an idle float animation. Accent tone drives the fill; honours reduced-motion.',
	args: { icon: 'atom', accent: 'primary', still: false },
	controls: {
		icon: { type: 'text' },
		// Tones without a dedicated accent rule fall back to the primary fill.
		accent: { type: 'select', options: TOKEN_COLOR_TONE },
		still: { type: 'boolean' }
	},
	presets: {
		Info: { accent: 'info' },
		Success: { accent: 'success' },
		Warning: { accent: 'warning' }
	}
} satisfies ContractStory<RecipeFloatingIcon>;
