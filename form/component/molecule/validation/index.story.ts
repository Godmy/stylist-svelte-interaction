import Validation from './index.svelte';
import type { RecipeValidation } from '$stylist/form/interface/recipe/validation';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_ORIENTATION } from '$stylist/layout/const/array/orientation';

/** Field wrapper with label, description, hint and error. */
export default {
	component: Validation,
	title: 'FormFieldGroup',
	description: 'Form field group component with label, description, and error support',
	args: {
		label: 'Email Address',
		description: "We'll never share your email with anyone else.",
		required: false,
		error: '',
		orientation: 'vertical'
	},
	controls: {
		label: { type: 'text' },
		description: { type: 'text' },
		required: { type: 'boolean' },
		error: { type: 'text' },
		hint: { type: 'text' },
		disabled: { type: 'boolean' },
		orientation: { type: 'select', options: TOKEN_ORIENTATION }
	},
	presets: {
		Required: { required: true },
		WithError: { error: 'Please enter a valid email address.' },
		Horizontal: { orientation: 'horizontal' }
	},
	content: [
		{
			kind: 'element',
			tag: 'input',
			attrs: { type: 'email', name: 'email', placeholder: 'email@example.com' }
		}
	],
	layout: 'padded'
} satisfies ContractStory<RecipeValidation>;
