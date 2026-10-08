<script lang="ts">
	import type { RecipeSimpleModal } from '$stylist/dialog/interface/recipe/simple-modal';
	import createSimpleModalState from './state.svelte';

	let props: RecipeSimpleModal = $props();
	const state = createSimpleModalState(() => props);
</script>

{#if props.open}
	<div class="sm-overlay">
		<div class={state.dialogClasses} {...props}>
			<div class="sm-header">
				<h3 class="sm-title">{props.title}</h3>
				<button type="button" onclick={props.onClose}>x</button>
			</div>
			<p class="sm-body">Simple modal content</p>
		</div>
	</div>
{/if}

<style>
	.sm-overlay {
		position: fixed;
		inset: 0;
		z-index: var(--z-index-modal);
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: color-mix(in srgb, var(--color-neutral-900) 40%, transparent);
		padding: 1rem;
	}

	.sm-dialog {
		width: 100%;
		max-width: 24rem;
		border-radius: 0.5rem;
		background-color: var(--color-background-primary);
		padding: 1.25rem;
	}
	.sm-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.sm-title {
		font-weight: 600;
	}
	.sm-body {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}
</style>
