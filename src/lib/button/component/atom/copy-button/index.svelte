<script lang="ts">
	import type { RecipeCopyButton } from '$stylist/button/interface/recipe/copy-button';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { createCopyButtonState } from './state.svelte';

	let props: RecipeCopyButton = $props();
	const state = createCopyButtonState(() => props);

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
			text,
			copyText,
			successMessage,
			showIcon,
			onSuccess,
			onError,
			...restProps
		} = props;
		return restProps;
	});
</script>

<button
	{...restButtonProps}
	type={props.type ?? 'button'}
	onclick={state.handleCopy}
	class={['c-copy-button', props.class].filter(Boolean).join(' ')}
	data-variant={state.variant}
	data-size={state.size}
	data-disabled={state.disabled || undefined}
	data-loading={state.loading || undefined}
	data-copied={state.copied || undefined}
	aria-busy={state.loading ? true : undefined}
	aria-live={state.loading ? 'polite' : undefined}
	aria-label={state.copied ? 'Copied' : state.ariaLabel || undefined}
>
	{#if props.showIcon}
		{#if state.copied}
			<svg
				class={state.iconClasses}
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
			<BaseIcon name="copy" class={state.iconClasses} size={16} aria-hidden="true" />
		{/if}
	{/if}
	<span class="c-copy-button__label">{state.copied ? 'Copied!' : (props.text ?? 'Copy')}</span>
</button>

<style>
	.c-copy-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-weight: 500;
		white-space: nowrap;
		cursor: pointer;
		text-decoration: none;
		transition:
			background-color 150ms ease,
			color 150ms ease,
			border-color 150ms ease,
			opacity 150ms ease;
		outline: none;
	}

	.c-copy-button:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	/* Variant styles */
	.c-copy-button[data-variant='default'] {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		border: 1px solid var(--color-border-primary);
	}
	.c-copy-button[data-variant='default']:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-copy-button[data-variant='primary'] {
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}
	.c-copy-button[data-variant='primary']:hover:not([data-disabled]) {
		background: var(--color-primary-700);
	}

	.c-copy-button[data-variant='secondary'] {
		background: var(--color-secondary-600);
		color: var(--color-text-inverse);
		border: 1px solid var(--color-secondary-700);
	}
	.c-copy-button[data-variant='secondary']:hover:not([data-disabled]) {
		background: var(--color-secondary-500);
	}

	.c-copy-button[data-variant='outline'] {
		background: transparent;
		color: var(--color-text-primary);
		border: 1px solid var(--color-neutral-400);
	}
	.c-copy-button[data-variant='outline']:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-copy-button[data-variant='ghost'] {
		background: transparent;
		color: var(--color-text-primary);
		border: 1px solid transparent;
	}
	.c-copy-button[data-variant='ghost']:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-copy-button[data-variant='subtle'] {
		background: var(--color-neutral-100);
		color: var(--color-text-primary);
		border: 1px solid transparent;
	}
	.c-copy-button[data-variant='subtle']:hover:not([data-disabled]) {
		background: var(--color-neutral-200);
	}

	/* Size styles */
	.c-copy-button[data-size='xs'] {
		height: 1.5rem;
		padding: 0 0.5rem;
		font-size: 0.75rem;
		border-radius: 0.25rem;
	}
	.c-copy-button[data-size='sm'] {
		height: 2rem;
		padding: 0 0.75rem;
		font-size: 0.875rem;
		border-radius: 0.375rem;
	}
	.c-copy-button[data-size='md'] {
		height: 2.25rem;
		padding: 0 1rem;
		font-size: 0.875rem;
		border-radius: 0.375rem;
	}
	.c-copy-button[data-size='lg'] {
		height: 2.75rem;
		padding: 0 1.5rem;
		font-size: 1rem;
		border-radius: 0.5rem;
	}
	.c-copy-button[data-size='xl'] {
		height: 3rem;
		padding: 0 1.75rem;
		font-size: 1.125rem;
		border-radius: 0.75rem;
	}

	/* State styles */
	.c-copy-button[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	/* Copied state - icon turns green */
	.c-copy-button__icon {
		width: 1rem;
		height: 1rem;
		flex: 0 0 auto;
		color: currentColor;
		transition: color 150ms ease;
	}
	.c-copy-button__icon--copied {
		color: var(--color-success-600);
	}

	/* Loader animation */
	.c-copy-button__loader {
		animation: c-copy-button-spin 1s linear infinite;
	}

	@keyframes c-copy-button-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
