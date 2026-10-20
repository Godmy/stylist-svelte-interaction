import InputField from './index.svelte';
import type { RecipeInputField } from '$stylist/input/interface/recipe/input-field';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Composed input with helper and error text. */
export default {
	component: InputField,
	title: 'InputField',
	description: 'Composed input with helper and error text.',
	args: {
		id: 'story-input-field',
		label: 'Work email',
		placeholder: 'designer@company.com',
		helperText: 'You can change this later in profile settings.',
		type: 'email',
		errors: [],
		required: true,
		disabled: false
	},
	controls: {
		label: { type: 'text' },
		placeholder: { type: 'text' },
		helperText: { type: 'text' },
		type: { type: 'select', options: ['text', 'email', 'password', 'number'] },
		required: { type: 'boolean' },
		disabled: { type: 'boolean' }
	},
	presets: {
		Required: { errors: ['Field is required'] },
		Invalid: { errors: ['Enter a valid value'] }
	}
} satisfies ContractStory<RecipeInputField>;
