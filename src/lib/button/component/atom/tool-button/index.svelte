<script lang="ts">
	import createToolButtonState from './state.svelte';
	import type { RecipeToolButton } from '$stylist/button/interface/recipe/tool-button';

	let props: RecipeToolButton = $props();
	const state = createToolButtonState(() => props);
</script>

<button
	class={['c-tool-button', props.class].filter(Boolean).join(' ')}
	data-active={state.active || undefined}
	aria-pressed={state.active}
	aria-label={state.label ?? state.tool}
	title={state.label ?? state.tool}
	onclick={state.handleClick}
>
	<span class="c-tool-button__icon">{state.icon}</span>
	{#if state.label}
		<span class="c-tool-button__label">{state.label}</span>
	{/if}
</button>

<style>
	.c-tool-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		border: 1px solid transparent;
		background: transparent;
		color: var(--color-text-primary);
		cursor: pointer;
		transition: background-color var(--duration-120, 120ms);
		border-radius: 0.375rem;
		font-size: 0.875rem;
	}

	.c-tool-button:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	.c-tool-button:hover:not([data-disabled]) {
		background: var(--color-background-secondary);
	}

	.c-tool-button[data-active] {
		background: var(--color-primary-600);
		color: var(--color-text-inverse);
	}

	.c-tool-button[data-active]:hover {
		background: var(--color-primary-700);
	}

	.c-tool-button__icon {
		display: inline-flex;
		font-size: 1.125rem;
		line-height: 1;
	}

	.c-tool-button__label {
		font-size: 0.75rem;
		font-weight: 500;
	}
</style>
