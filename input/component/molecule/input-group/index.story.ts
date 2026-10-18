import InputGroup from './index.svelte';
import type { RecipeInputGroup } from '$stylist/input/interface/recipe/input-group';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Input with an attached action button. */
export default {
	component: InputGroup,
	title: 'InputGroup',
	description: 'Input with an attached action button for search, submit, or lookup flows.',
	args: {
		label: 'Search',
		placeholder: 'Search projects...',
		value: '',
		variant: 'default',
		size: 'md',
		disabled: false,
		error: false,
		required: false,
		buttonLabel: 'Find',
		buttonVariant: 'primary',
		buttonDisabled: false
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
		buttonLabel: { type: 'text' },
		buttonVariant: { type: 'select', options: TOKEN_COLOR_TONE },
		buttonDisabled: { type: 'boolean' }
	},
	presets: { Error: { error: true, errors: ['Nothing found'] } }
} satisfies ContractStory<RecipeInputGroup>;
