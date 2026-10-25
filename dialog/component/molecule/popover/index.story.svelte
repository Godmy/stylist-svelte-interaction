<script lang="ts">
	import Popover from '$stylist/dialog/component/molecule/popover/index.svelte';
	import type { RecipePopover } from '$stylist/dialog/interface/recipe/popover';

	// Render of index.story.ts: the trigger and the content are snippet props.
	let args: RecipePopover = $props();
</script>

<Popover {...args}>
	{#snippet trigger()}
		<button class="_c1">SlotToggle popover</button>
	{/snippet}
	{#snippet content()}
		<ul class="_c2">
			<li>Ana Trujillo</li>
			<li>Devon Lane</li>
			<li>Leslie Alexander</li>
		</ul>
	{/snippet}
</Popover>

<style>
	._c1 {
		border-radius: 0.375rem;
		background-color: var(--color-primary-600);
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		color: var(--color-text-inverse);
	}
	._c2 {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
	._c2 > * + * {
		margin-top: 0.25rem;
	}
</style>
