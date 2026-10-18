import LoginForm from './index.svelte';
import type { RecipeLoginForm } from '$stylist/form/interface/recipe/login-form';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Email/password sign-in form. */
export default {
	component: LoginForm,
	title: 'LoginForm',
	description: 'A login form component for user authentication with email and password fields.',
	args: { email: '', rememberMe: false },
	controls: {
		email: { type: 'text' },
		rememberMe: { type: 'boolean' }
	},
	presets: { Remembered: { email: 'user@example.com', rememberMe: true } },
	layout: 'padded'
} satisfies ContractStory<RecipeLoginForm>;
