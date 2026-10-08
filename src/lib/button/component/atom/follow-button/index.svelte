<script lang="ts">
	import type { RecipeFollowButton } from '$stylist/button/interface/recipe/follow-button';
	import { createFollowButtonState } from './state.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: RecipeFollowButton = $props();
	const state = createFollowButtonState(() => props);
</script>

<button
	type="button"
	class={['c-follow-button', props.class].filter(Boolean).join(' ')}
	data-variant={state.variant}
	data-size={state.size}
	data-disabled={state.disabled || undefined}
	data-following={state.isFollowing || undefined}
	data-pending={state.isPending || undefined}
	onclick={state.handleToggle}
	disabled={state.disabled || state.isPending}
	aria-label={state.ariaLabel}
>
	{#if state.isPending}
		<div class="c-follow-button__inner">
			<BaseIcon name="loader-2" class="c-follow-button__loader" size={16} />
			{#if state.showText}
				<span>{state.isFollowing ? 'Unfollowing...' : 'Following...'}</span>
			{/if}
		</div>
	{:else}
		<div class="c-follow-button__inner">
			{#if state.isFollowing}
				<svg
					class="c-follow-button__icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.25"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M5 12.5l4.5 4.5L19 7" />
				</svg>
			{:else}
				<BaseIcon name="user-plus" class="c-follow-button__icon" size={16} />
			{/if}
			{#if state.showText}
				<span>{state.text}</span>
			{/if}
		</div>
	{/if}
</button>

<style>
	.c-follow-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		border-radius: 0.375rem;
		cursor: pointer;
		transition:
			background-color 150ms ease,
			color 150ms ease,
			border-color 150ms ease,
			opacity 150ms ease;
		outline: none;
		border: 1px solid transparent;
	}

	.c-follow-button:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	.c-follow-button__inner {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.375rem;
	}

	.c-follow-button__icon {
		width: 1rem;
		height: 1rem;
		flex: 0 0 auto;
	}

	.c-follow-button[data-variant='primary']:not([data-following]) {
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
		border-color: transparent;
	}

	.c-follow-button[data-variant='primary']:not([data-following]):hover:not([data-disabled]) {
		background: var(--color-primary-700);
	}

	.c-follow-button[data-variant='secondary']:not([data-following]) {
		background: var(--color-secondary-600);
		color: var(--color-text-inverse);
		border-color: var(--color-secondary-700);
	}

	.c-follow-button[data-variant='secondary']:not([data-following]):hover:not([data-disabled]) {
		background: var(--color-secondary-500);
	}

	.c-follow-button[data-variant='outline']:not([data-following]) {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		border-color: var(--color-border-primary);
	}

	.c-follow-button[data-variant='outline']:not([data-following]):hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-follow-button[data-variant='ghost']:not([data-following]) {
		background: transparent;
		color: var(--color-text-primary);
	}

	.c-follow-button[data-variant='ghost']:not([data-following]):hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-follow-button[data-following] {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		border-color: var(--color-border-primary);
	}

	.c-follow-button[data-following]:hover:not([data-disabled]) {
		background: color-mix(in srgb, var(--color-danger-600) 12%, var(--color-background-primary));
		color: var(--color-danger-600);
		border-color: color-mix(in srgb, var(--color-danger-600) 42%, var(--color-border-primary));
	}

	.c-follow-button[data-size='sm'] {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
	}

	.c-follow-button[data-size='md'] {
		font-size: 0.875rem;
		padding: 0.375rem 0.75rem;
	}

	.c-follow-button[data-size='lg'] {
		font-size: 1rem;
		padding: 0.5rem 1rem;
	}

	.c-follow-button[data-disabled] {
		opacity: var(--opacity-75, 0.75);
		cursor: not-allowed;
		pointer-events: none;
	}

	:global(.c-follow-button__loader) {
		animation: c-follow-button-spin 1s linear infinite;
	}

	@keyframes c-follow-button-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
