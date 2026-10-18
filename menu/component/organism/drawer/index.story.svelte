<script lang="ts">
	// Render of index.story.ts: the header and actions are named snippets, which story content cannot provide.
	import Drawer from './index.svelte';
	import type { RecipeDrawer } from '$stylist/menu/interface/recipe/drawer';

	let args: RecipeDrawer = $props();
</script>

<Drawer {...args}>
	{#snippet header()}
		<h2 class="_c1">Quick settings</h2>
	{/snippet}
	<div class="_c2">
		<p>Notifications</p>
		<p>Theme</p>
		<p>Privacy</p>
	</div>
	{#snippet actions()}
		<div class="_c3">
			<button class="_c4">Cancel</button>
			<button class="_c5">Save</button>
		</div>
	{/snippet}
</Drawer>

<style>
	._c1 {
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 600;
	}
	._c2 {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	._c2 > * + * {
		margin-top: 0.5rem;
	}
	._c3 {
		display: flex;
		gap: 0.5rem;
	}
	._c4 {
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	._c5 {
		border-radius: 0.25rem;
		background-color: var(--color-primary-600);
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-inverse);
	}
</style>
