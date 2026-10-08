<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import PhoneNumberInput from './index.svelte';

	let value = $state('79999999999');

	const controls: SlotStory[] = [
		{ name: 'placeholder', type: 'text', defaultValue: '+7 (___) ___-__-__' },
		{ name: 'helpText', type: 'text', defaultValue: 'Supports Russian +7 format.' },
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'required', type: 'boolean', defaultValue: false },
		{ name: 'error', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	component={PhoneNumberInput}
	title="PhoneNumberInput"
	description="Formatted phone input with normalized value output."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1 max-w-sm">
			<PhoneNumberInput
				{value}
				placeholder={values.placeholder}
				helpText={values.helpText}
				disabled={values.disabled}
				required={values.required}
				error={values.error}
				onValueChange={(next) => (value = next)}
			/>
			<p class="_c2">Raw value: {value}</p>
		</div>
	{/snippet}
</Story>

<style>
	._c1 > * + * {
		margin-top: 0.5rem;
	}
	._c2 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
</style>
