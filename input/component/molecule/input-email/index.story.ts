import InputEmail from './index.svelte';
import type { RecipeInputEmail } from '$stylist/input/interface/recipe/input-email';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Email input with format validation. */
export default {
	component: InputEmail,
	title: 'InputEmail',
	description: 'Email input with format validation, helper copy, and disabled/error states.',
	args: {
		label: 'Email',
		placeholder: 'example@email.com',
		value: '',
		variant: 'default',
		size: 'md',
		disabled: false,
		error: false,
		required: false,
		helperText: 'Use the address where we can reach you.',
		errors: []
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
		helperText: { type: 'text' }
	},
	presets: { Invalid: { value: 'jane@', errors: ['Enter a valid email address'] } }
} satisfies ContractStory<RecipeInputEmail>;
