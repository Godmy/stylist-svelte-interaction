<script lang="ts">
	import type { RecipeModal } from '$stylist/dialog/interface/recipe/modal';
	import createModalState from './state.svelte';

	let props: RecipeModal = $props();
	const state = createModalState(() => props);
</script>

{#if props.open}
	<div class="nav-overlay nav-overlay--50">
		<div class={state.dialogClasses} {...props}>
			<div class="nav-dialog-header">
				<h2 class="nav-modal-title">{props.title}</h2>
				<button type="button" onclick={props.onClose}>x</button>
			</div>
			<div class="nav-modal-body">Modal body content</div>
			<div class="nav-modal-footer">
				<button class="nav-btn-close" type="button" onclick={props.onClose}>Cancel</button>
				<button class="nav-btn-confirm" type="button" onclick={props.onClose}>Confirm</button>
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

	.nav-overlay--50 {
		background-color: color-mix(in srgb, var(--color-neutral-900) 50%, transparent);
	}

	.nav-dialog {
		width: 100%;
		max-width: 32rem;
		border-radius: 0.75rem;
		background-color: var(--color-background-primary);
		padding: 1.5rem;
	}

	.nav-dialog-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-modal-title {
		font-size: 1.125rem;
		font-weight: 600;
	}
	.nav-modal-body {
		margin-top: 1rem;
		font-size: 0.875rem;
		color: var(--color-text-primary);
	}

	.nav-modal-footer {
		margin-top: 1.5rem;
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
	}

	.nav-btn-close {
		border-radius: 0.25rem;
		border: 1px solid;
		padding: 0.25rem 0.75rem;
	}

	.nav-btn-confirm {
		border-radius: 0.25rem;
		background-color: var(--color-primary-600);
		padding: 0.25rem 0.75rem;
		color: var(--color-text-inverse);
	}
</style>
