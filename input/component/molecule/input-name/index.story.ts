import InputName from '$stylist/input/component/molecule/input-name/index.svelte';
import type { RecipeInputName } from '$stylist/input/interface/recipe/input-name';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Name input with autocomplete. */
export default {
	component: InputName,
	title: 'InputName',
	description: 'Name input with autocomplete, helper copy, and validation states.',
	args: {
		label: 'Name',
		placeholder: 'Full name',
		value: '',
		variant: 'default',
		size: 'md',
		disabled: false,
		error: false,
		required: false,
		helperText: 'Use the name shown on the account.',
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
	presets: { Required: { required: true, errors: ['Name is required'] } }
} satisfies ContractStory<RecipeInputName>;
