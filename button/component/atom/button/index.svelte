<script lang="ts">
	import type { RecipeButtonElement as SlotButtonElement } from '$stylist/button/interface/recipe/button-element';
	import createButtonState from './state.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { CONTROL_BUTTON_ICON } from '$stylist/button/const/map/button';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let props: SlotButtonElement & HTMLButtonAttributes = $props();
	const state = createButtonState(() => props);
</script>

<button
	{...state.factoryInput.html.attrs}
	type={state.factoryInput.html.type ?? 'button'}
	class={['c-button', state.factoryInput.html.class].filter(Boolean).join(' ')}
	data-variant={state.state.variant}
	data-size={state.state.size}
	data-disabled={state.state.isDisabled || undefined}
	data-loading={state.state.loading || undefined}
	data-block={state.state.block || undefined}
	{...state.attrs}
>
	{#if state.loading}
		<BaseIcon
			name={CONTROL_BUTTON_ICON.LOADER}
			class="c-button__loader"
			size={16}
			aria-hidden="true"
		/>
		<span class="c-button__sr-only">{state.factoryInput.contract.loadingLabel ?? 'Loading...'}</span
		>
	{/if}

	{#if state.factoryInput.slots.children}
		<span class="c-button__text">{@render state.factoryInput.slots.children()}</span>
	{:else if state.loading}
		<span class="c-button__text">{state.factoryInput.contract.loadingLabel ?? 'Loading...'}</span>
	{/if}
</button>

<style>
	.c-button {
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
			opacity 150ms ease,
			transform 100ms ease;
		outline: none;
		position: relative;
	}

	.c-button:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	.c-button:active:not([data-disabled]):not([data-loading]) {
		transform: scale(0.97);
	}

	/* Variant styles */
	.c-button[data-variant='default'] {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		border: 1px solid var(--color-border-primary);
	}
	.c-button[data-variant='default']:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-button[data-variant='primary'] {
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}
	.c-button[data-variant='primary']:hover:not([data-disabled]) {
		background: var(--color-primary-700);
	}

	.c-button[data-variant='secondary'] {
		background: var(--color-secondary-600);
		color: var(--color-text-inverse);
		border: 1px solid var(--color-secondary-700);
	}
	.c-button[data-variant='secondary']:hover:not([data-disabled]) {
		background: var(--color-secondary-500);
	}

	.c-button[data-variant='success'] {
		background: var(--color-success-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}

	.c-button[data-variant='danger'] {
		background: var(--color-danger-600);
		color: var(--color-text-inverse);
		border: 1px solid transparent;
	}

	.c-button[data-variant='outline'] {
		background: transparent;
		color: var(--color-text-primary);
		border: 1px solid var(--color-neutral-400);
	}
	.c-button[data-variant='outline']:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-button[data-variant='ghost'] {
		background: transparent;
		color: var(--color-text-primary);
		border: 1px solid transparent;
	}
	.c-button[data-variant='ghost']:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-button[data-variant='subtle'] {
		background: var(--color-neutral-100);
		color: var(--color-text-primary);
		border: 1px solid transparent;
	}
	.c-button[data-variant='subtle']:hover:not([data-disabled]) {
		background: var(--color-neutral-200);
	}

	.c-button[data-variant='dark'] {
		background: var(--color-neutral-800);
		color: var(--color-text-inverse);
		border: 1px solid var(--color-neutral-700);
	}

	/* Size styles */
	.c-button[data-size='xs'] {
		height: 1.5rem;
		padding: 0 0.5rem;
		font-size: 0.75rem;
		border-radius: 0.25rem;
	}
	.c-button[data-size='sm'] {
		height: 2rem;
		padding: 0 0.75rem;
		font-size: 0.875rem;
		border-radius: 0.375rem;
	}
	.c-button[data-size='md'] {
		height: 2.25rem;
		padding: 0 1rem;
		font-size: 0.875rem;
		border-radius: 0.375rem;
	}
	.c-button[data-size='lg'] {
		height: 2.75rem;
		padding: 0 1.5rem;
		font-size: 1rem;
		border-radius: 0.5rem;
	}
	.c-button[data-size='xl'] {
		height: 3rem;
		padding: 0 1.75rem;
		font-size: 1.125rem;
		border-radius: 0.75rem;
	}
	.c-button[data-size='2xl'] {
		height: 3.5rem;
		padding: 0 2rem;
		font-size: 1.25rem;
		border-radius: 0.75rem;
	}

	/* State styles */
	.c-button[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	.c-button[data-loading] .c-button__text {
		color: transparent;
	}

	.c-button[data-block] {
		width: 100%;
	}

	/* Loader animation */
	.c-button__loader {
		animation: c-button-spin 1s linear infinite;
		position: absolute;
	}

	@keyframes c-button-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Screen reader only */
	.c-button__sr-only {
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
