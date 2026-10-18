import PhoneNumberInput from './index.svelte';
import type { RecipePhoneNumberInput } from '$stylist/input/interface/recipe/phone-number-input';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Formatted phone input with normalized value output. */
export default {
	component: PhoneNumberInput,
	title: 'PhoneNumberInput',
	description: 'Formatted phone input with normalized value output.',
	args: {
		value: '79999999999',
		placeholder: '+7 (___) ___-__-__',
		helpText: 'Supports Russian +7 format.',
		disabled: false,
		required: false,
		error: false
	},
	controls: {
		placeholder: { type: 'text' },
		helpText: { type: 'text' },
		disabled: { type: 'boolean' },
		required: { type: 'boolean' },
		error: { type: 'boolean' }
	}
} satisfies ContractStory<RecipePhoneNumberInput>;
