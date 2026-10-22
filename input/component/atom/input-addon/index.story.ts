import InputAddon from '$stylist/input/component/atom/input-addon/index.svelte';
import type { RecipeInputAddon } from '$stylist/input/interface/recipe/input-addon';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';

/** Prefix/suffix element attached to input controls. */
export default {
	component: InputAddon,
	title: 'InputAddon',
	description: 'Prefix/suffix element attached to input controls.',
	args: {
		position: 'left',
		variant: 'default',
		withIcon: true,
		addonText: '$',
		placeholder: 'Search projects...'
	},
	controls: {
		position: { type: 'select', options: ['left', 'right'] },
		variant: { type: 'select', options: TOKEN_COLOR_TONE },
		// Story knobs: the addon content and the demo input next to it.
		withIcon: { type: 'boolean' },
		addonText: { type: 'text' },
		placeholder: { type: 'text' }
	},
	presets: { Text: { withIcon: false }, Right: { position: 'right' } }
} satisfies ContractStory<
	RecipeInputAddon & { withIcon?: boolean; addonText?: string; placeholder?: string }
>;
