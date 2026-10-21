import InputDouble from './index.svelte';
import type { RecipeInputDouble } from '$stylist/input/interface/recipe/input-double';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Two related input fields in one row. */
export default {
	component: InputDouble,
	title: 'InputDouble',
	description:
		'Two related input fields in one row for paired data such as first and last name or city and street.',
	args: {
		label1: 'First name',
		label2: 'Last name',
		placeholder1: 'Jane',
		placeholder2: 'Cooper',
		value1: '',
		value2: '',
		variant: 'default',
		size: 'md',
		disabled1: false,
		disabled2: false,
		required1: false,
		required2: false,
		errors1: [],
		errors2: []
	},
	controls: {
		label1: { type: 'text' },
		label2: { type: 'text' },
		placeholder1: { type: 'text' },
		placeholder2: { type: 'text' },
		value1: { type: 'text' },
		value2: { type: 'text' },
		variant: { type: 'select', options: TOKEN_COLOR_TONE },
		// xs … 2xl: the sizes the input field styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 6) },
		disabled1: { type: 'boolean' },
		disabled2: { type: 'boolean' },
		required1: { type: 'boolean' },
		required2: { type: 'boolean' }
	},
	presets: {
		Errors: {
			required1: true,
			required2: true,
			errors1: ['First name is required'],
			errors2: ['Last name is required']
		}
	}
} satisfies ContractStory<RecipeInputDouble>;
