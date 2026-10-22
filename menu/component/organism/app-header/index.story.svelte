<script lang="ts">
	// Render of index.story.ts: the trailing actions are a named snippet, which story content cannot provide.
	import AppHeader from '$stylist/menu/component/organism/app-header/index.svelte';
	import type { RecipeAppHeader } from '$stylist/menu/interface/recipe/app-header';

	let args: RecipeAppHeader = $props();
</script>

<AppHeader {...args}>
	{#snippet trailing()}
		<div class="_c1">Account</div>
	{/snippet}
</AppHeader>

<style>
	._c1 {
		border-radius: 999px;
		background: var(--color-background-secondary, #f1f5f9);
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-secondary, #6b7280);
	}
</style>
