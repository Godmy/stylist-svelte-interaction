<script lang="ts">
	import type { RecipeDatePicker } from '$stylist/calendar/interface/recipe/date-picker';
	import createDatePickerState from './state.svelte';

	let props: RecipeDatePicker = $props();
	const state = createDatePickerState(() => props);
</script>

<div class="date-picker">
	<input
		type="text"
		readonly
		value={state.displayValue}
		placeholder={state.placeholder}
		class="date-picker__input"
		role="combobox"
		onclick={state.openPicker}
		disabled={state.disabled}
		aria-haspopup="dialog"
		aria-expanded={state.isOpen}
		{...state.restProps}
	/>

	{#if state.isOpen && !state.disabled}
		<input
			type="date"
			bind:value={state.internalValue}
			onchange={state.handleDateChange}
			min={state.minValue}
			max={state.maxValue}
			class="date-picker__calendar"
		/>
	{/if}
</div>

<style>
	.date-picker {
		position: relative;
		display: block;
		width: 100%;
	}

	.date-picker__input {
		box-sizing: border-box;
		width: 100%;
		min-height: 2.5rem;
		border-radius: var(--border-radius-base, 0.375rem);
		border: 1px solid var(--color-border-primary);
		padding: 0.625rem 0.75rem;
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		cursor: pointer;
	}

	.date-picker__input:disabled {
		cursor: not-allowed;
		background: var(--color-background-secondary);
		color: var(--color-text-tertiary, var(--color-text-secondary));
	}

	.date-picker__input:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary-200);
	}

	.date-picker__calendar {
		position: absolute;
		inset-block-start: 100%;
		inset-inline-start: 0;
		z-index: var(--z-index-docked);
		box-sizing: border-box;
		margin-block-start: 0.25rem;
		width: max(100%, 16rem);
		max-width: min(20rem, calc(100vw - 2rem));
		border-radius: var(--border-radius-base, 0.375rem);
		border: 1px solid var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 0.625rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}
</style>
