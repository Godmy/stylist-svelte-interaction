<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import SearchResults from './index.svelte';

	type SearchResultItem = {
		id: string;
		title: string;
		description?: string;
		type: 'user' | 'event' | 'document' | 'generic';
		metadata?: {
			date?: string;
			author?: string;
			location?: string;
		};
	};

	const results: SearchResultItem[] = [
		{
			id: '1',
			title: 'SlotOrder #1001',
			description: 'SlotOrder detail page',
			type: 'generic',
			metadata: { date: '2026-02-14', author: 'Admin' }
		},
		{
			id: '2',
			title: 'Invoice Document',
			description: 'PDF invoice',
			type: 'document',
			metadata: { date: '2026-02-10' }
		},
		{
			id: '3',
			title: 'John Doe',
			description: 'Customer profile',
			type: 'user',
			metadata: { location: 'NYC' }
		}
	];

	type Props = { showMetadata: boolean; loading: boolean };
	const controls: SlotStory[] = [
		{ name: 'showMetadata', type: 'boolean', defaultValue: true },
		{ name: 'loading', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	id="organisms-search-results"
	title="Organisms / Interaction / Controls / Search / Search Results"
	component={SearchResults}
	category="Organisms/Interaction/Controls/Search"
	{controls}
>
	{#snippet children(values: any)}
		{@const typedProps = values as Props}
		<div class="sb-organisms-search-results _c1">
			<SearchResults
				{results}
				query="order"
				showMetadata={typedProps.showMetadata}
				loading={typedProps.loading}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 1rem;
	}
</style>
