import InputPinDigit from '$stylist/input/component/atom/input-pin-digit/index.svelte';
import type { RecipeInputPinDigit } from '$stylist/input/interface/recipe/input-pin-digit';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Single digit input used in OTP/PIN flows. */
export default {
	component: InputPinDigit,
	title: 'InputPinDigit',
	description: 'Single digit input used in OTP/PIN flows.',
	args: { value: '4', focused: false, invalid: false, size: 'md', variant: 'default' },
	controls: {
		value: { type: 'text' },
		focused: { type: 'boolean' },
		invalid: { type: 'boolean' },
		// sm … lg: the sizes the digit styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(1, 4) },
		variant: { type: 'select', options: TOKEN_COLOR_TONE }
	},
	presets: { Invalid: { invalid: true }, Focused: { focused: true } }
} satisfies ContractStory<RecipeInputPinDigit>;
