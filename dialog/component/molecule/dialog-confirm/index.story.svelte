<script lang="ts">
	import DialogConfirm from '$stylist/dialog/component/molecule/dialog-confirm/index.svelte';
	import type { RecipeDialogConfirm } from '$stylist/dialog/interface/recipe/dialog-confirm';

	// Render of index.story.ts: onClose and onConfirm are required callbacks; the story owns isOpen so they can close the dialog.
	let args: Partial<RecipeDialogConfirm> = $props();
	let isOpen = $derived(args.isOpen ?? false);
</script>

<div class="_c1">
	<button type="button" onclick={() => (isOpen = true)}>Open dialog</button>

	<DialogConfirm
		{...args}
		title={args.title ?? ''}
		message={args.message ?? ''}
		{isOpen}
		onClose={() => (isOpen = false)}
		onConfirm={() => (isOpen = false)}
	/>
</div>

<style>
	._c1 {
		padding: 1rem;
	}
</style>
