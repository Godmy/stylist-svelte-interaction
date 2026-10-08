<script lang="ts">
	import createTimeSlotState from './state.svelte';
	import type { RecipeTimeSlot } from '$stylist/calendar/interface/recipe/time-slot';

	let props: RecipeTimeSlot = $props();
	const state = createTimeSlotState(() => props);
</script>

<div
	class={state.wrapperClasses}
	role="button"
	tabindex="0"
	onclick={state.handleClick}
	onkeydown={state.handleKeyDown}
	aria-label={state.ariaLabel}
	{...state.restProps}
>
	<div class="c-time-slot__label">
		{state.displayTimeLabel}
	</div>
	{#if state.events && state.events.length > 0}
		<div class="c-time-slot__count">
			{state.events.length}
			{state.events.length === 1 ? 'event' : 'events'}
		</div>
	{/if}
</div>

<style>
	.c-time-slot {
		display: flex;
		flex-direction: column;
		padding: var(--spacing-sm, 0.75rem);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.25rem;
		cursor: pointer;
		transition: all var(--duration-200, 200ms) ease;
	}

	.c-time-slot:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary-500);
	}

	.c-time-slot--available {
		background: var(--color-background-primary);
		border-color: var(--color-border-primary);
	}

	.c-time-slot--available:hover {
		background: var(--color-background-secondary);
	}

	.c-time-slot--unavailable {
		background: var(--color-background-secondary);
		border-color: var(--color-border-secondary);
		color: var(--color-text-tertiary, var(--color-text-secondary));
		cursor: not-allowed;
	}

	.c-time-slot--selected {
		box-shadow: 0 0 0 2px var(--color-primary-500);
		background: color-mix(in srgb, var(--color-primary-500) 5%, transparent);
		border-color: var(--color-primary-300, var(--color-primary-500));
	}

	.c-time-slot--active {
		border-color: var(--color-accent-500, var(--color-primary-500));
		background: color-mix(
			in srgb,
			var(--color-accent-500, var(--color-primary-500)) 5%,
			transparent
		);
	}

	.c-time-slot__label {
		font-size: var(--text-size-sm, 0.875rem);
		font-weight: var(--font-weight-medium, 500);
		color: var(--color-text-primary);
	}

	.c-time-slot__count {
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
		margin-top: var(--spacing-xs, 0.25rem);
	}
</style>
