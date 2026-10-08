<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import AutoSearch from './index.svelte';

	let query = $state('');

	const controls: SlotStory[] = [
		{ name: 'placeholder', type: 'text', defaultValue: 'Search projects...' }
	];
</script>

<Story
	component={AutoSearch}
	title="AutoSearch"
	description="Text search field with immediate change callbacks."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<AutoSearch
				value={query}
				placeholder={values.placeholder}
				onValueChange={(next) => (query = next)}
			/>
			<p class="_c2">Query: {query || 'empty'}</p>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		max-width: 28rem;
	}
	._c1 > * + * {
		margin-top: 0.5rem;
	}
	._c2 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
</style>
