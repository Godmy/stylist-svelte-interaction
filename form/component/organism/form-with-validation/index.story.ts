import FormWithValidation from './index.svelte';
import type { RecipeFormWithValidation } from '$stylist/form/interface/recipe/form-with-validation';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Email/password form with inline validity hints. */
export default {
	component: FormWithValidation,
	title: 'FormWithValidation',
	description: 'A form component with comprehensive validation for various input types.',
	args: { email: 'user@example.com', password: 'secret' },
	controls: {
		email: { type: 'text' },
		password: { type: 'text' }
	},
	presets: {
		Valid: { email: 'user@example.com', password: 'correct-horse' },
		Invalid: { email: 'user', password: '123' }
	},
	layout: 'padded'
} satisfies ContractStory<RecipeFormWithValidation>;
