<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import AutocompleteDropdown from './index.svelte';

	let value = $state('');

	const options = [
		{ label: 'Design', value: 'design' },
		{ label: 'Development', value: 'development' },
		{ label: 'Marketing', value: 'marketing' },
		{ label: 'Operations', value: 'operations' }
	];

	const controls: SlotStory[] = [
		{ name: 'placeholder', type: 'text', defaultValue: 'Select a team...' }
	];
</script>

<Story
	component={AutocompleteDropdown}
	title="AutocompleteDropdown"
	description="Dropdown selector with option list and controlled value."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1 max-w-sm">
			<AutocompleteDropdown
				{options}
				{value}
				placeholder={values.placeholder}
				onValueChange={(next) => (value = next)}
			/>
			<p class="_c2">Selected: {value || 'none'}</p>
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
