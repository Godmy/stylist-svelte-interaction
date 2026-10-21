import InputError from './index.svelte';
import type { RecipeInputError } from '$stylist/input/interface/recipe/input-error';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Validation message shown below invalid input fields. */
export default {
	component: InputError,
	title: 'InputError',
	description: 'Validation message shown below invalid input fields.',
	args: { text: 'Email is required.', visible: true },
	controls: { text: { type: 'text' }, visible: { type: 'boolean' } }
} satisfies ContractStory<RecipeInputError>;
