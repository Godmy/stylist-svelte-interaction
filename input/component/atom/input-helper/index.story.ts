import InputHelper from './index.svelte';
import type { RecipeInputHelper } from '$stylist/input/interface/recipe/input-helper';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';

/** Supportive helper text for input controls. */
export default {
	component: InputHelper,
	title: 'InputHelper',
	description: 'Supportive helper text for input controls.',
	args: { text: 'Use 8 or more characters.', variant: 'default' },
	controls: {
		text: { type: 'text' },
		variant: { type: 'select', options: TOKEN_COLOR_TONE }
	}
} satisfies ContractStory<RecipeInputHelper>;
