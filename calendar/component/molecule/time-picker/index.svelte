<script lang="ts">
	import type { RecipeTimePicker } from '$stylist/calendar/interface/recipe/time-picker';
	import createTimePickerState from './state.svelte';

	let props: RecipeTimePicker = $props();
	const state = createTimePickerState(() => props);
</script>

<div class={`time-picker ${state.className}`.trim()}>
	<input
		type="time"
		class={`time-picker__input${state.disabled ? ' time-picker__input--disabled' : ''}`}
		value={state.selectedTime}
		step={state.step}
		disabled={state.disabled}
		onchange={state.handleChange}
	/>
</div>

<style>
	.time-picker {
		width: 100%;
	}

	.time-picker__input {
		box-sizing: border-box;
		width: 100%;
		border-radius: var(--border-radius-base, 0.375rem);
		border: 1px solid var(--color-border-primary);
		padding: 0.625rem 0.75rem;
		background-color: var(--color-background-primary);
		color: var(--color-text-primary);
		font-size: var(--text-size-sm, 0.875rem);
	}

	.time-picker__input:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary-200);
		border-color: var(--color-primary-500);
	}

	.time-picker__input--disabled {
		cursor: not-allowed;
		background-color: var(--color-background-secondary);
		color: var(--color-text-tertiary);
	}
</style>
