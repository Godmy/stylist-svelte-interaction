<script lang="ts">
	// Render of index.story.ts: the story owns open/query and filters a fixed list as results.
	import SearchOverlay from '$stylist/search/component/molecule/search-overlay/index.svelte';
	import type { RecipeSearchOverlay } from '$stylist/search/interface/recipe/search-overlay';

	let args: RecipeSearchOverlay = $props();
	// Follow the args and are overwritten by the overlay.
	let open = $derived(args.open ?? false);
	let query = $derived(args.query ?? '');
	const items = ['design tokens', 'token alias', 'theme provider', 'search field'];
</script>

<SearchOverlay {...args} bind:open bind:query>
	{#snippet results(term)}
		{@const matches = items.filter((item) => item.includes(term.toLowerCase()))}
		{#if matches.length}
			<ul class="_c1">
				{#each matches as item (item)}<li>{item}</li>{/each}
			</ul>
		{:else}
			<p class="_c2">No matches.</p>
		{/if}
	{/snippet}
</SearchOverlay>

<style>
	._c1 {
		margin: 0;
		padding-inline-start: var(--space-5, 1.25rem);
	}
	._c2 {
		margin: 0;
		padding: var(--space-2, 0.5rem);
		color: var(--color-text-secondary, GrayText);
	}
</style>
