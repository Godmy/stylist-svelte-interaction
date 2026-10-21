import FormFooter from './index.svelte';
import type { RecipeFormFooter } from '$stylist/form/interface/recipe/form-footer';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Form action row. */
export default {
	component: FormFooter,
	title: 'FormFooter',
	description: 'Action row with primary and optional secondary button.',
	args: {
		primaryButtonLabel: 'Continue',
		secondaryButtonLabel: 'Cancel',
		showSecondaryButton: true,
		primaryButtonDisabled: false,
		secondaryButtonDisabled: false
	},
	controls: {
		primaryButtonLabel: { type: 'text' },
		secondaryButtonLabel: { type: 'text' },
		showSecondaryButton: { type: 'boolean' },
		primaryButtonDisabled: { type: 'boolean' },
		secondaryButtonDisabled: { type: 'boolean' }
	},
	presets: {
		PrimaryOnly: { showSecondaryButton: false },
		Disabled: { primaryButtonDisabled: true }
	},
	layout: 'padded'
} satisfies ContractStory<RecipeFormFooter>;
