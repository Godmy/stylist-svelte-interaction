import TextArea from './index.svelte';
import type { RecipeTextArea } from '$stylist/input/interface/recipe/text-area';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Multiline text area. */
export default {
	component: TextArea,
	title: 'Textarea',
	description: 'Multiline text area with maxlength, helper text, and auto-resize behavior.',
	args: {
		label: 'Message',
		placeholder: 'Write a message...',
		value: '',
		variant: 'default',
		size: 'md',
		disabled: false,
		error: false,
		required: false,
		rows: 4,
		autoResize: false,
		maxlength: 1000,
		helperText: 'Maximum 1000 characters.'
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
		rows: { type: 'number', min: 2, max: 20 },
		autoResize: { type: 'boolean' },
		maxlength: { type: 'number', min: 0, max: 10000 },
		helperText: { type: 'text' }
	},
	presets: { Error: { error: true, errors: ['Message is required'] } }
} satisfies ContractStory<RecipeTextArea>;
