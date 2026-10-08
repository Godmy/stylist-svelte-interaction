<script lang="ts">
	import createAddressFormState from './state.svelte';

	const props = $props();
	const state = createAddressFormState(() => props);
</script>

<form class={state.rootClass} {...props}>
	<input class={state.inputClass} placeholder="Street" value={props.street} />
	<div class={state.gridClass}>
		<input class={state.gridItemClass} placeholder="City" value={props.city} />
		<input class={state.gridItemClass} placeholder="Region" value={props.region} />
	</div>
	<div class={state.gridClass}>
		<input class={state.gridItemClass} placeholder="Postal code" value={props.postalCode} />
		<input class={state.gridItemClass} placeholder="SlotCountry" value={props.country} />
	</div>
</form>

<style>
	.c-address-form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		padding: 1rem;
	}
	.c-address-form__input {
		width: 100%;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.25rem;
		padding: 0.25rem 0.5rem;
		color: var(--color-text-primary);
		background-color: var(--color-background-primary);
	}
	.c-address-form__grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}
</style>
