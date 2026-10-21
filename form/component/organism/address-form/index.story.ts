import AddressForm from './index.svelte';
import type { RecipeAddressForm } from '$stylist/form/interface/recipe/address-form';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Street, city, region, postal code and country inputs. */
export default {
	component: AddressForm,
	title: 'AddressForm',
	description: 'An address form component for collecting shipping or billing address information.',
	args: {
		street: '221B Baker Street',
		city: 'London',
		region: 'Greater London',
		postalCode: 'NW1 6XE',
		country: 'United Kingdom'
	},
	controls: {
		street: { type: 'text' },
		city: { type: 'text' },
		region: { type: 'text' },
		postalCode: { type: 'text' },
		country: { type: 'text' }
	},
	presets: { Empty: { street: '', city: '', region: '', postalCode: '', country: '' } },
	layout: 'padded'
} satisfies ContractStory<RecipeAddressForm>;
