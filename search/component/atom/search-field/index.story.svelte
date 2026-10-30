<script lang="ts">
	// Render of index.story.ts: the value is bound to local state that typing and Escape change.
	import SearchField from '$stylist/search/component/atom/search-field/index.svelte';
	import type { RecipeSearchField } from '$stylist/search/interface/recipe/search-field';

	let args: RecipeSearchField = $props();
	// Follows the args and is overwritten by typing and Escape.
	let value = $derived(args.value ?? '');
</script>

<div class="_c1">
	<SearchField {...args} bind:value />
	<p class="_c2">Value: {value || 'empty'}</p>
</div>

<style>
	._c1 {
		display: grid;
		gap: var(--space-2, 0.5rem);
	}
	._c2 {
		margin: 0;
		font-size: var(--font-size-3-5, 0.875rem);
		color: var(--color-text-secondary, GrayText);
	}
</style>
