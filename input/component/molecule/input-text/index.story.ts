import InputText from './index.svelte';
import type { RecipeInputText } from '$stylist/input/interface/recipe/input-text';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Base text input. */
export default {
	component: InputText,
	title: 'InputText',
	description: 'Base text input with variants, sizes, validation, and helper/error states.',
	args: {
		label: 'Text field',
		placeholder: 'Enter text...',
		value: '',
		variant: 'default',
		size: 'md',
		disabled: false,
		error: false,
		block: true,
		required: false,
		helperText: 'Helper text clarifies what belongs here.',
		errors: [],
		readonly: false
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
		block: { type: 'boolean' },
		required: { type: 'boolean' },
		helperText: { type: 'text' },
		readonly: { type: 'boolean' }
	},
	presets: { Error: { errors: ['This field is required'] } }
} satisfies ContractStory<RecipeInputText>;
