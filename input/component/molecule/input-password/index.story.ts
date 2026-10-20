import InputPassword from './index.svelte';
import type { RecipeInputPassword } from '$stylist/input/interface/recipe/input-password';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Password input with visibility controls. */
export default {
	component: InputPassword,
	title: 'InputPassword',
	description: 'Password input with visibility controls, validation states, and helper copy.',
	args: {
		label: 'Password',
		placeholder: '••••••••',
		value: '',
		variant: 'default',
		size: 'md',
		disabled: false,
		error: false,
		required: false,
		helperText: 'Use at least 8 characters.',
		errors: [],
		allowTogglePassword: true,
		showPasswordStrength: true
	},
	controls: {
		label: { type: 'text' },
		placeholder: { type: 'text' },
		value: { type: 'text' },
		variant: { type: 'select', options: TOKEN_COLOR_TONE },
		// xs … 2xl: the sizes the input field styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 6) },
		disabled: { type: 'boolean' },
		error: { type: 'boolean' },
		required: { type: 'boolean' },
		helperText: { type: 'text' },
		allowTogglePassword: { type: 'boolean' },
		showPasswordStrength: { type: 'boolean' }
	},
	presets: {
		Strong: { value: 'Correct-Horse-42' },
		Error: { errors: ['Password is too short'] }
	}
} satisfies ContractStory<RecipeInputPassword>;
