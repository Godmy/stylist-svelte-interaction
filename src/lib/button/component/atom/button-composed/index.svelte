<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import { CONTROL_BUTTON_ICON } from '$stylist/button/const/map/button';
	import type { RecipeButtonComposed } from '$stylist/button/interface/recipe/button-composed';
	import createButtonComposedState from './state.svelte';

	let props: RecipeButtonComposed = $props();
	const state = createButtonComposedState(() => props);
</script>

<button
	{...state.restProps}
	type="button"
	class={state.classes}
	style={state.inlineStyle}
	disabled={state.isDisabled}
	data-variant={state.variant}
	data-size={state.size}
	data-disabled={state.isDisabled || undefined}
	data-loading={state.isLoading || undefined}
	data-block={props.block || undefined}
	aria-busy={state.isLoading}
	aria-label={props.ariaLabel ?? state.text}
	onclick={state.handleClick}
	ondblclick={state.handleDblClick}
	oncontextmenu={state.handleContextMenu}
	onfocus={state.handleFocus}
	onblur={state.handleBlur}
>
	{#if state.isLoading}
		<BaseIcon
			name={CONTROL_BUTTON_ICON.LOADER}
			size={16}
			class="c-button-composed__loader"
			aria-hidden="true"
		/>
		<span class="c-button-composed__sr-only">{state.loadingLabel}</span>
	{/if}

	{#if props.iconLeft}
		<BaseIcon name={props.iconLeft} size={16} aria-hidden="true" />
	{:else if props.icon}
		<BaseIcon name={props.icon} size={16} aria-hidden="true" />
	{/if}

	{#if props.children}
		{@render props.children()}
	{:else if state.text}
		<span>{state.text}</span>
	{/if}

	{#if props.iconRight}
		<BaseIcon name={props.iconRight} size={16} aria-hidden="true" />
	{/if}

	{#if state.badgeText}
		<span class="c-button-composed__badge">{state.badgeText}</span>
	{:else if state.showDot}
		<span class="c-button-composed__dot" aria-hidden="true"></span>
	{/if}
</button>

<style>
	.c-button-composed {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-weight: 500;
		white-space: nowrap;
		text-decoration: none;
		position: relative;
		transition:
			background-color var(--duration-120, 120ms),
			color var(--duration-120, 120ms),
			border-color var(--duration-120, 120ms),
			transform 100ms ease,
			opacity var(--duration-120, 120ms);
		cursor: pointer;
		border: 1px solid transparent;
	}

	.c-button-composed:active:not([data-disabled]):not([data-loading]) {
		transform: scale(0.97);
	}

	.c-button-composed:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	.c-button-composed[data-disabled] {
		opacity: var(--opacity-50, 0.5);
		cursor: not-allowed;
		pointer-events: none;
	}

	.c-button-composed[data-block] {
		width: 100%;
	}

	.c-button-composed[data-variant='default'] {
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		border-color: var(--color-border-primary);
	}

	.c-button-composed[data-variant='default']:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-button-composed[data-variant='primary'] {
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
		border-color: transparent;
	}

	.c-button-composed[data-variant='primary']:hover:not([data-disabled]) {
		background: var(--color-primary-700);
	}

	.c-button-composed[data-variant='secondary'] {
		background: var(--color-secondary-600);
		color: var(--color-text-inverse);
		border-color: var(--color-secondary-700);
	}

	.c-button-composed[data-variant='secondary']:hover:not([data-disabled]) {
		background: var(--color-secondary-500);
	}

	.c-button-composed[data-variant='success'] {
		background: var(--color-success-600);
		color: var(--color-text-inverse);
		border-color: transparent;
	}

	.c-button-composed[data-variant='success']:hover:not([data-disabled]) {
		background: var(--color-success-700);
	}

	.c-button-composed[data-variant='warning'] {
		background: var(--color-warning-500);
		color: var(--color-text-inverse);
		border-color: transparent;
	}

	.c-button-composed[data-variant='warning']:hover:not([data-disabled]) {
		background: var(--color-warning-600);
	}

	.c-button-composed[data-variant='danger'] {
		background: var(--color-danger-600);
		color: var(--color-text-inverse);
		border-color: transparent;
	}

	.c-button-composed[data-variant='danger']:hover:not([data-disabled]) {
		background: var(--color-danger-700);
	}

	.c-button-composed[data-size='xs'] {
		height: 1.5rem;
		padding: 0 0.5rem;
		font-size: 0.75rem;
		border-radius: 0.25rem;
	}

	.c-button-composed[data-size='sm'] {
		height: 2rem;
		padding: 0 0.75rem;
		font-size: 0.875rem;
		border-radius: 0.375rem;
	}

	.c-button-composed[data-size='md'] {
		height: 2.25rem;
		padding: 0 1rem;
		font-size: 0.875rem;
		border-radius: 0.375rem;
	}

	.c-button-composed[data-size='lg'] {
		height: 2.75rem;
		padding: 0 1.5rem;
		font-size: 1rem;
		border-radius: 0.5rem;
	}

	.c-button-composed[data-size='xl'] {
		height: 3rem;
		padding: 0 1.75rem;
		font-size: 1.125rem;
		border-radius: 0.75rem;
	}

	.c-button-composed__loader {
		animation: spin 1s linear infinite;
		position: absolute;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.c-button-composed__sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		border: 0;
	}

	.c-button-composed__badge {
		margin-left: 0.25rem;
		border-radius: 9999px;
		background: currentColor;
		padding: 0.125rem 0.375rem;
		font-size: 0.65rem;
		line-height: 1;
		color: white;
	}

	.c-button-composed__dot {
		margin-left: 0.25rem;
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 9999px;
		background: currentColor;
	}
</style>
