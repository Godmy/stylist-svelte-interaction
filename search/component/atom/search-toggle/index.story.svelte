<script lang="ts">
	// Render of index.story.ts: the toggle only reports clicks, so the story owns the open state.
	import SearchToggle from '$stylist/search/component/atom/search-toggle/index.svelte';
	import type { RecipeSearchToggle } from '$stylist/search/interface/recipe/search-toggle';

	let args: RecipeSearchToggle = $props();
	// Follows the args and is overwritten by the toggle.
	let open = $derived(args.open ?? false);
</script>

<div class="_c1">
	<SearchToggle {...args} {open} onToggle={() => (open = !open)} />
	<p class="_c2">State: {open ? 'open' : 'closed'}</p>
</div>

<style>
	._c1 {
		display: flex;
		align-items: center;
		gap: var(--space-3, 0.75rem);
	}
	._c2 {
		margin: 0;
		font-size: var(--font-size-3-5, 0.875rem);
		color: var(--color-text-secondary, GrayText);
	}
</style>
