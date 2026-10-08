<script lang="ts">
	import type { RecipeDialog } from '$stylist/dialog/interface/recipe/dialog';
	import createDialogState from './state.svelte';

	let props: RecipeDialog = $props();
	const state = createDialogState(() => props);
</script>

{#if props.open}
	<div class="nav-overlay">
		<div class={state.dialogClasses} {...props}>
			<div class="nav-dialog-header">
				<h3 class="nav-dialog-title">{props.title}</h3>
				<button type="button" onclick={props.onClose}>x</button>
			</div>
			<p class="nav-dialog-desc">{props.description}</p>
			<div class="nav-dialog-footer">
				<button type="button" class="nav-btn-close" onclick={props.onClose}>Close</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.nav-overlay {
		position: fixed;
		inset: 0;
		z-index: var(--z-index-modal);
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: color-mix(in srgb, var(--color-neutral-900) 40%, transparent);
		padding: 1rem;
	}

	.nav-dialog {
		width: 100%;
		max-width: 28rem;
		border-radius: 0.5rem;
		background-color: var(--color-background-primary);
		padding: 1.25rem;
	}

	.nav-dialog-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-dialog-title {
		font-weight: 600;
	}
	.nav-dialog-desc {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.nav-dialog-footer {
		margin-top: 1rem;
		display: flex;
		justify-content: flex-end;
	}

	.nav-btn-close {
		border-radius: 0.25rem;
		border: 1px solid;
		padding: 0.25rem 0.75rem;
	}
</style>
