<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeDialogConfirm } from '$stylist/dialog/interface/recipe/dialog-confirm';
	import createDialogConfirmState from './state.svelte';

	let props: RecipeDialogConfirm = $props();
	const state = createDialogConfirmState(() => props);
</script>

{#snippet dialogContent()}
	<div class="dc-body">
		<div class="dc-icon-wrap">
			<BaseIcon name={state.iconName} class={`dc-icon ${state.iconColor}`} />
		</div>
		<div class="dc-message-wrap">
			<p class="dc-message">{props.message}</p>
		</div>
	</div>
{/snippet}

{#snippet dialogFooter()}
	<button
		type="button"
		disabled={state.isLoading}
		class={`dc-btn-confirm ${state.confirmButtonClasses}`}
		onclick={state.handleConfirm}
	>
		{#if state.isLoading}
			<BaseIcon name="loader-2" class="dc-spinner" />
		{/if}
		{props.confirmText ?? 'Confirm'}
	</button>
	<button type="button" disabled={state.isLoading} class="dc-btn-cancel" onclick={props.onClose}>
		{props.cancelText ?? 'Cancel'}
	</button>
{/snippet}

{#if props.isOpen}
	<div class="dc-overlay">
		<div class="dc-card">
			<h3 class="dc-title">{props.title}</h3>
			{@render dialogContent()}
			<div class="dc-footer">
				{@render dialogFooter()}
			</div>
		</div>
	</div>
{/if}

<style>
	.dc-overlay {
		position: fixed;
		inset: 0;
		z-index: var(--z-index-overlay);
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: color-mix(in srgb, var(--color-neutral-900) 40%, transparent);
		padding: 1rem;
	}

	.dc-card {
		width: 100%;
		max-width: 28rem;
		border-radius: 0.5rem;
		background-color: var(--color-background-primary);
		padding: 1.5rem;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
	}

	.dc-title {
		margin-bottom: 1rem;
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.dc-body {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}

	.dc-icon-wrap {
		display: flex;
		width: 3rem;
		height: 3rem;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		background-color: var(--color-neutral-100);
	}

	:global(.dc-icon) {
		width: 1.5rem;
		height: 1.5rem;
	}
	:global(.dc-icon--danger) {
		color: var(--color-danger-600);
	}
	:global(.dc-icon--warning) {
		color: var(--color-warning-600);
	}
	:global(.dc-icon--info) {
		color: var(--color-primary-600);
	}

	.dc-message-wrap {
		flex: 1;
	}
	.dc-message {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.dc-footer {
		margin-top: 1.5rem;
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
	}

	.dc-btn-confirm {
		display: inline-flex;
		width: auto;
		justify-content: center;
		border-radius: 0.375rem;
		border: 1px solid transparent;
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-inverse);
	}

	.dc-btn-confirm:disabled {
		cursor: not-allowed;
		opacity: var(--opacity-50, 0.5);
	}

	.dc-btn-confirm--danger {
		background-color: var(--color-danger-600);
	}
	.dc-btn-confirm--danger:hover:not(:disabled) {
		background-color: var(--color-danger-700);
	}
	.dc-btn-confirm--warning {
		background-color: var(--color-warning-600, #d97706);
	}
	.dc-btn-confirm--warning:hover:not(:disabled) {
		background-color: var(--color-warning-700, #b45309);
	}
	.dc-btn-confirm--info {
		background-color: var(--color-primary-600);
	}
	.dc-btn-confirm--info:hover:not(:disabled) {
		background-color: var(--color-primary-700);
	}

	.dc-btn-cancel {
		display: inline-flex;
		width: auto;
		justify-content: center;
		border-radius: 0.375rem;
		border: 1px solid var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.dc-btn-cancel:hover {
		background-color: var(--color-background-secondary);
	}
	.dc-btn-cancel:disabled {
		cursor: not-allowed;
		opacity: var(--opacity-50, 0.5);
	}

	:global(.dc-spinner) {
		margin-right: 0.5rem;
		margin-left: -0.25rem;
		width: 1rem;
		height: 1rem;
		color: var(--color-text-inverse);
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
