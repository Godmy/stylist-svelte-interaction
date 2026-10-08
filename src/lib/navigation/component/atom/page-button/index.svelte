<script lang="ts">
	import { PresetPageButton } from '$stylist/navigation/const/preset/page-button';
	import type { RecipePageButton } from '$stylist/navigation/interface/recipe/page-button';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createPageButtonState } from './state.svelte';

	/**
	 * PageButton component - A button for pagination
	 * Uses the same props as Button for consistency (SOLID - Liskov Substitution)
	 */
	let props: RecipePageButton = $props();
	const state = createPageButtonState(() => props);

	// Extract rest props manually to avoid $$restProps in runes mode
	let restButtonProps = $derived.by(() => {
		const {
			variant,
			size,
			disabled,
			loading,
			block,
			loadingLabel,
			children,
			class: classProp,
			page,
			isActive,
			...restProps
		} = props;
		return restProps;
	});
</script>

<button
	{...restButtonProps}
	type={props.type ?? 'button'}
	class={['c-page-button', props.class].filter(Boolean).join(' ')}
	data-variant={state.variant}
	data-size={state.size}
	data-disabled={state.disabled || undefined}
	data-loading={state.loading || undefined}
	data-active={state.isActive || undefined}
	disabled={state.disabled}
	aria-busy={state.loading ? true : undefined}
	aria-live={state.loading ? 'polite' : undefined}
	aria-current={props.isActive ? 'page' : undefined}
>
	{#if state.loading}
		<BaseIcon
			name={PresetPageButton.Loader2}
			class="c-page-button__loader"
			size={16}
			aria-hidden="true"
		/>
		<span class="c-page-button__sr-only">{props.loadingLabel ?? 'Loading...'}</span>
	{:else if props.children}
		{#if props.children}{@render props.children()}{/if}
	{:else}
		{props.page}
	{/if}
</button>

<style>
	.c-page-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		cursor: pointer;
		transition:
			background-color 150ms ease,
			color 150ms ease,
			border-color 150ms ease,
			opacity 150ms ease;
		outline: none;
		border-radius: 0.375rem;
	}

	.c-page-button:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	/* Variant styles */
	.c-page-button[data-variant='outline'] {
		background: transparent;
		color: var(--color-text-primary);
		border: 1px solid var(--color-neutral-400);
	}
	.c-page-button[data-variant='outline']:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	/* Active (primary) state */
	.c-page-button[data-variant='primary'],
	.c-page-button[data-active] {
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}

	.c-page-button[data-variant='default'] {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		border: 1px solid var(--color-border-primary);
	}
	.c-page-button[data-variant='default']:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-page-button[data-variant='ghost'] {
		background: transparent;
		color: var(--color-text-primary);
		border: 1px solid transparent;
	}
	.c-page-button[data-variant='ghost']:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-page-button[data-variant='subtle'] {
		background: var(--color-neutral-100);
		color: var(--color-text-primary);
		border: 1px solid transparent;
	}
	.c-page-button[data-variant='subtle']:hover:not([data-disabled]) {
		background: var(--color-neutral-200);
	}

	/* Size styles — square pagination buttons */
	.c-page-button[data-size='xs'] {
		width: 1.75rem;
		height: 1.75rem;
		font-size: 0.75rem;
	}
	.c-page-button[data-size='sm'] {
		width: 2rem;
		height: 2rem;
		font-size: 0.875rem;
	}
	.c-page-button[data-size='md'] {
		width: 2.25rem;
		height: 2.25rem;
		font-size: 0.875rem;
	}
	.c-page-button[data-size='lg'] {
		width: 2.75rem;
		height: 2.75rem;
		font-size: 1rem;
	}
	.c-page-button[data-size='xl'] {
		width: 3rem;
		height: 3rem;
		font-size: 1rem;
	}
	.c-page-button[data-size='2xl'] {
		width: 3.5rem;
		height: 3.5rem;
		font-size: 1.125rem;
	}

	/* State styles */
	.c-page-button[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	/* Loader animation */
	.c-page-button__loader {
		animation: c-page-button-spin 1s linear infinite;
	}

	@keyframes c-page-button-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Screen reader only */
	.c-page-button__sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
