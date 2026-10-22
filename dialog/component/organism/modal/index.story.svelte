<script lang="ts">
	import Modal from '$stylist/dialog/component/organism/modal/index.svelte';
	import type { RecipeModal } from '$stylist/dialog/interface/recipe/modal';

	// Render of index.story.ts: the overlay only closes through onClose; the story owns the open state and an open button.
	let args: RecipeModal = $props();
	let open = $derived(args.open ?? false);
</script>

<div class="_c1">
	<button class="_c2" onclick={() => (open = true)}>Open Modal</button>
	<Modal {...args} {open} onClose={() => (open = false)} />
</div>

<style>
	._c1 {
		padding: 1rem;
	}
	._c2 {
		margin-bottom: 1rem;
		border-radius: 0.25rem;
		background-color: var(--color-primary-600);
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		color: var(--color-text-inverse);
	}
</style>
