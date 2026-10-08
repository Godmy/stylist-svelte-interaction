<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import SearchForm from './index.svelte';

	type Props = {
		placeholder: string;
		showFilters: boolean;
		showAdvanced: boolean;
		showRecentSearches: boolean;
		debounce: number;
	};

	const controls: SlotStory[] = [
		{ name: 'placeholder', type: 'text', defaultValue: 'Search...' },
		{ name: 'showFilters', type: 'boolean', defaultValue: true },
		{ name: 'showAdvanced', type: 'boolean', defaultValue: false },
		{ name: 'showRecentSearches', type: 'boolean', defaultValue: true },
		{ name: 'debounce', type: 'number', defaultValue: 300 }
	];

	function handleSearch(query: string, filters?: any) {
		console.log('Search submitted:', query, filters);
		alert(`Searching for: ${query}`);
	}

	function handleFilterChange(filters: any) {
		console.log('Filters changed:', filters);
	}
</script>

<Story
	id="organisms-search-form"
	title="Organisms / Interaction / Forms / Search Form"
	component={SearchForm}
	category="Organisms/Interaction/Forms"
	description="A search form component with filters and advanced search capabilities."
	tags={['search', 'form', 'filters']}
	{controls}
>
	{#snippet children(values: any)}
		<div class="sb-organisms-search-form _c1">
			<h1 class="_c2">SearchForm Component</h1>

			<div class="_c3">
				<h2 class="_c4">Interactive SearchForm</h2>
				<div class="_c5">
					<SearchForm placeholder={values.placeholder} />
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
		position: relative;
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
