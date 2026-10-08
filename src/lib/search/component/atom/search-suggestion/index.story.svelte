<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import SearchSuggestion from './index.svelte';

	let picked = $state('');

	const suggestions = [
		{ id: '1', text: 'Analytics dashboard', category: 'Pages', count: 12 },
		{ id: '2', text: 'Annual report', category: 'Documents', count: 3 },
		{ id: '3', text: 'Team settings', category: 'Settings', count: 1 },
		{ id: '4', text: 'API tokens', category: 'Security', count: 2 }
	];

	const controls: SlotStory[] = [
		{ name: 'query', type: 'text', defaultValue: 'a' },
		{ name: 'loading', type: 'boolean', defaultValue: false },
		{ name: 'maxSuggestions', type: 'number', defaultValue: 4, min: 1, max: 10, step: 1 }
	];
</script>

<Story
	component={SearchSuggestion}
	title="SearchSuggestion"
	description="Suggestion list for typeahead and search UX."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<SearchSuggestion
				{suggestions}
				query={values.query}
				loading={values.loading}
				maxSuggestions={values.maxSuggestions}
				onValueChange={(item) => (picked = item.text)}
			/>
			<p class="_c2">Picked: {picked || 'none'}</p>
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
