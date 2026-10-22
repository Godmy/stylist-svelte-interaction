import ButtonComposed from '$stylist/button/component/atom/button-composed/index.svelte';
import type { RecipeButtonComposed } from '$stylist/button/interface/recipe/button-composed';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Decorated Button with icons, a badge/dot indicator and extra interaction hooks. */
export default {
	component: ButtonComposed,
	title: 'ButtonComposed',
	description:
		'Decorated variant of Button: adds left/right icons, a badge/dot indicator, and dedicated focus/blur/double-click/context-menu handlers. Use plain Button for simple text actions; use ButtonComposed when the action needs an icon, a status badge, or those extra interaction hooks.',
	args: {
		text: 'Deploy changes',
		variant: 'primary',
		size: 'md',
		loading: false,
		disabled: false,
		dot: false,
		iconLeft: 'plus',
		iconRight: 'arrow-right'
	},
	controls: {
		text: { type: 'text' },
		// The tones ButtonComposed styles.
		variant: {
			type: 'select',
			options: TOKEN_COLOR_TONE.filter(
				(tone) => !['neutral', 'tertiary', 'info', 'error'].includes(tone)
			)
		},
		// xs … xl: the sizes ButtonComposed styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 5) },
		loading: { type: 'boolean' },
		disabled: { type: 'boolean' },
		dot: { type: 'boolean' }
	},
	presets: { Badge: { badge: 3 }, Loading: { loading: true } },
	layout: 'centered'
} satisfies ContractStory<RecipeButtonComposed>;
