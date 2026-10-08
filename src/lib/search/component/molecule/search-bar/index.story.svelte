<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import SearchBar from './index.svelte';
	import type { TokenControllerType } from '$stylist/domain/type/alias/controller-type';

	const controls = [
		{
			name: 'placeholder',
			type: 'text' as TokenControllerType,
			defaultValue: 'Search...',
			description: 'Placeholder text for the search bar'
		},
		{
			name: 'value',
			type: 'text' as TokenControllerType,
			defaultValue: '',
			description: 'Current value of the search bar'
		},
		{
			name: 'disabled',
			type: 'boolean' as TokenControllerType,
			defaultValue: false,
			description: 'Whether the search bar is disabled'
		},
		{
			name: 'debounceMs',
			type: 'number' as TokenControllerType,
			defaultValue: 300,
			description: 'Debounce time in milliseconds'
		}
	];

	let submittedQuery = $state('');
	let clearedCount = $state(0);

	function handleSearch(query: string) {
		submittedQuery = query;
	}

	function handleClear() {
		clearedCount += 1;
		submittedQuery = '';
	}
</script>

<Story
	{controls}
	title="SearchBar Component"
	description="Search bar component with debounce and clear functionality"
>
	{#snippet children(controlValues: any)}
		<div class="_c1">
			<SearchBar
				placeholder={controlValues.placeholder}
				value={controlValues.value}
				disabled={controlValues.disabled}
				debounceMs={controlValues.debounceMs}
				onSearch={handleSearch}
				onClear={handleClear}
			/>
			<div class="_c2">
				<span>Submitted: {submittedQuery || 'none'}</span>
				<span>Clears: {clearedCount}</span>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		gap: 0.75rem;
		max-width: 36rem;
		padding: 1rem;
	}
	._c2 {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
</style>
