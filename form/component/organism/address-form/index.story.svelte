<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import type { SlotAddressData } from '$stylist/form/interface/slot/address-data';
	import AddressForm from './index.svelte';

	type Props = {
		showCountry: boolean;
		showState: boolean;
		showCity: boolean;
		showZipCode: boolean;
		showStreet: boolean;
		showApartment: boolean;
		showPhone: boolean;
		requireAll: boolean;
	};

	const controls: SlotStory[] = [
		{ name: 'showCountry', type: 'boolean', defaultValue: true },
		{ name: 'showState', type: 'boolean', defaultValue: true },
		{ name: 'showCity', type: 'boolean', defaultValue: true },
		{ name: 'showZipCode', type: 'boolean', defaultValue: true },
		{ name: 'showStreet', type: 'boolean', defaultValue: true },
		{ name: 'showApartment', type: 'boolean', defaultValue: true },
		{ name: 'showPhone', type: 'boolean', defaultValue: true },
		{ name: 'requireAll', type: 'boolean', defaultValue: false }
	];

	function handleSubmit(address: SlotAddressData) {
		console.log('Address submitted:', address);
		alert('Address submitted successfully!');
	}

	function handleValidationError(errors: any) {
		console.log('Validation errors:', errors);
	}
</script>

<Story
	id="organisms-address-form"
	title="Organisms / Interaction / Forms / Address Form"
	component={AddressForm}
	category="Organisms/Interaction/Forms"
	description="An address form component for collecting shipping or billing address information."
	tags={['form', 'address', 'shipping', 'billing']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="sb-organisms-address-form _c1">
			<h1 class="_c2">AddressForm Component</h1>

			<div class="_c3">
				<h2 class="_c4">Interactive AddressForm</h2>
				<div class="_c5">
					<AddressForm />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
	._c1 > * + * {
		margin-top: 1.5rem;
	}
	._c2 {
		margin-bottom: 1rem;
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 600;
	}
	._c3 {
		margin-bottom: 1.5rem;
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		padding: 1rem;
	}
	._c4 {
		font-size: 1rem;
		line-height: 1.5rem;
		margin-bottom: 0.5rem;
		font-weight: 600;
	}
	._c5 {
		max-width: 32rem;
	}
</style>
