<script lang="ts">
	import ConfirmationDialog from '$stylist/dialog/component/molecule/confirmation-dialog/index.svelte';
	import type { RecipeConfirmationDialog } from '$stylist/dialog/interface/recipe/confirmation-dialog';

	// Render of index.story.ts: the dialog cannot open itself; the story owns the open state and closes it on confirm, cancel or close.
	let args: RecipeConfirmationDialog = $props();
	let open = $derived(args.open ?? false);
</script>

<div class="_c1">
	<button class="_c2" onclick={() => (open = true)}>Show Confirmation Dialog</button>

	<ConfirmationDialog
		{...args}
		{open}
		onConfirm={() => (open = false)}
		onCancel={() => (open = false)}
		onClose={() => (open = false)}
	/>
</div>

<style>
	._c1 {
		padding: 1rem;
	}
	._c2 {
		border-radius: 0.25rem;
		background-color: var(--color-primary-600);
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		color: var(--color-text-inverse);
	}
	._c2:hover {
		background-color: var(--color-primary-700);
	}
</style>
