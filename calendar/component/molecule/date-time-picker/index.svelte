<script lang="ts">
	import type { RecipeDateTimePicker } from '$stylist/calendar/interface/recipe/date-time-picker';
	import createDateTimePickerState from './state.svelte';
	import FormDatePicker from '$stylist/calendar/component/molecule/form-date-picker/index.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	const Calendar = 'calendar';

	let props: RecipeDateTimePicker = $props();
	const state = createDateTimePickerState(() => props);
</script>

<div class={`date-time-picker ${state.className}`.trim()}>
	<div class="date-time-picker__row">
		<input
			use:state.dateInputAction
			type="text"
			class={`date-time-picker__date-input ${state.dateClass} ${state.disabled ? 'date-time-picker__input--disabled' : ''}`.trim()}
			readonly
			value={state.selectedDate
				? state.selectedDate.toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
						year: 'numeric'
					})
				: ''}
			onclick={state.toggleDropdown}
			disabled={state.disabled}
			{...props}
		/>

		<select
			class={`date-time-picker__time-select ${state.timeClass} ${state.disabled ? 'date-time-picker__input--disabled' : ''}`.trim()}
			value={state.selectedTime}
			onchange={state.handleTimeChange}
			disabled={state.disabled}
		>
			{#each state.timeOptions as option}
				<option value={option}>
					{new Date(`1970-01-01T${option}:00`).toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit'
					})}
				</option>
			{/each}
		</select>

		{#if !state.disabled}
			<button type="button" class="date-time-picker__icon-btn" onclick={state.toggleDropdown}>
				<BaseIcon name={Calendar} size={16} style="color: var(--color-text-secondary)" />
			</button>
		{/if}
	</div>

	{#if state.isOpen}
		<div
			use:state.datePickerAction
			class={`date-time-picker__panel ${state.dropdownClass}`}
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e: KeyboardEvent) => e.stopPropagation()}
			role="dialog"
			tabindex={0}
		>
			<FormDatePicker
				value={state.selectedDate ? state.selectedDate.toISOString().split('T')[0] : ''}
				onChange={state.handleDateValueChange}
				minDate={state.minDate ? state.minDate.toISOString().split('T')[0] : undefined}
				maxDate={state.maxDate ? state.maxDate.toISOString().split('T')[0] : undefined}
			/>
		</div>
	{/if}
</div>

<style>
	.date-time-picker {
		position: relative;
		width: 100%;
	}

	.date-time-picker__row {
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
	}

	.date-time-picker__date-input {
		box-sizing: border-box;
		width: 100%;
		cursor: pointer;
		border-start-start-radius: var(--border-radius-base, 0.375rem);
		border-end-start-radius: var(--border-radius-base, 0.375rem);
		border-start-end-radius: 0;
		border-end-end-radius: 0;
		border: 1px solid var(--color-border-primary);
		padding: 0.625rem 2.5rem 0.625rem 0.75rem;
	}

	.date-time-picker__date-input:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary-200);
	}

	.date-time-picker__time-select {
		box-sizing: border-box;
		min-width: 7.5rem;
		border-start-start-radius: 0;
		border-end-start-radius: 0;
		border-start-end-radius: var(--border-radius-base, 0.375rem);
		border-end-end-radius: var(--border-radius-base, 0.375rem);
		border: 1px solid var(--color-border-primary);
		border-inline-start: none;
		padding: 0.625rem 2rem 0.625rem 0.75rem;
	}

	.date-time-picker__time-select:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary-200);
	}

	.date-time-picker__input--disabled {
		cursor: not-allowed;
		background-color: var(--color-background-secondary);
		color: var(--color-text-tertiary);
	}

	.date-time-picker__icon-btn {
		position: absolute;
		inset-block: 0;
		inset-inline-end: 0;
		padding-inline: 0.75rem;
		border-start-end-radius: var(--border-radius-base, 0.375rem);
		border-end-end-radius: var(--border-radius-base, 0.375rem);
		background: none;
		border: none;
		cursor: pointer;
	}

	.date-time-picker__icon-btn:hover {
		background-color: var(--color-background-secondary);
	}

	.date-time-picker__panel {
		position: absolute;
		z-index: var(--z-index-docked);
		inset-inline: 0;
		box-sizing: border-box;
		margin-block-start: 0.25rem;
		border-radius: var(--border-radius-base, 0.375rem);
		border: 1px solid var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}
</style>
