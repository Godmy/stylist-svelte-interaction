<script lang="ts">
	import type { RecipeFormDatePicker } from '$stylist/calendar/interface/recipe/form-date-picker';
	import createFormDatePickerState from './state.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	const Calendar = 'calendar';

	let props: RecipeFormDatePicker = $props();
	const state = createFormDatePickerState(() => props);
</script>

<div class={`fdp ${state.hostClass}`}>
	<label for="date-picker-input" class="fdp__label">
		{state.label}
	</label>

	<div class="fdp__input-wrap">
		<input
			id="date-picker-hidden"
			type="date"
			class="fdp__native"
			value={state.selectedDate}
			min={state.minDate}
			max={state.maxDate}
			oninput={state.handleInput}
			onchange={state.handleChange}
			{...props}
		/>

		<input
			id="date-picker-input"
			type="text"
			class={`fdp__input ${state.inputClass}`}
			placeholder={state.placeholder}
			value={state.selectedDate ? state.formatDate(state.selectedDate) : ''}
			readonly
			onclick={state.toggleCalendar}
			aria-label={state.label || 'Select date'}
		/>

		<div class="fdp__icon-wrap">
			<BaseIcon
				name={Calendar}
				size={20} style="color: var(--color-text-tertiary)"
			/>
		</div>
	</div>

	{#if state.showCalendar}
		<div class={`fdp__calendar ${state.calendarClass}`}>
			<input
				type="date"
				class="fdp__calendar-input"
				value={state.selectedDate}
				min={state.minDate}
				max={state.maxDate}
				onchange={(e) => {
					state.handleChange(e);
					state.closeCalendar();
				}}
			/>
		</div>
	{/if}

	{#if state.helperText}
		<p class="fdp__helper">{state.helperText}</p>
	{/if}

	{#if state.error}
		<p class="fdp__error">{state.error}</p>
	{/if}
</div>

<style>
	.fdp {
		position: relative;
		width: 100%;
	}

	.fdp__label {
		display: block;
		margin-block-end: 0.25rem;
		font-size: var(--text-size-sm, 0.875rem);
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.fdp__input-wrap {
		position: relative;
	}

	.fdp__input {
		box-sizing: border-box;
		display: block;
		width: 100%;
		border-radius: var(--border-radius-base, 0.375rem);
		border: 1px solid var(--color-border-primary);
		padding: 0.5rem 2.5rem 0.5rem 0.75rem;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		cursor: pointer;
	}

	.fdp__input:focus {
		outline: none;
		border-color: var(--color-primary-500);
		box-shadow: 0 0 0 2px var(--color-primary-100);
	}

	.fdp__icon-wrap {
		pointer-events: none;
		position: absolute;
		inset-block: 0;
		inset-inline-end: 0;
		display: flex;
		align-items: center;
		width: 2.5rem;
		justify-content: center;
	}

	.fdp__calendar {
		position: absolute;
		z-index: var(--z-index-docked);
		inset-inline: 0;
		box-sizing: border-box;
		margin-block-start: 0.25rem;
		border-radius: var(--border-radius-base, 0.375rem);
		border: 1px solid var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 0.75rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.fdp__calendar-input {
		box-sizing: border-box;
		display: block;
		width: 100%;
		border-radius: var(--border-radius-base, 0.375rem);
		border: 1px solid var(--color-border-primary);
		padding: 0.5rem;
	}

	.fdp__helper {
		margin-block-start: 0.25rem;
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
	}

	.fdp__error {
		margin-block-start: 0.25rem;
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-danger-600);
	}

	.fdp input[type='date']::-webkit-calendar-picker-indicator {
		background: transparent;
		bottom: 0;
		color: transparent;
		cursor: pointer;
		height: auto;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		width: auto;
	}

	.fdp__native {
		position: absolute;
		inset: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}
</style>
