<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeDateRangePicker } from '$stylist/calendar/interface/recipe/date-range-picker';
	import createDateRangePickerState from './state.svelte';

	const ChevronLeft = 'chevron-left';
	const ChevronRight = 'chevron-right';
	const X = 'x';

	let props: RecipeDateRangePicker = $props();
	const state = createDateRangePickerState(() => props);
</script>

<div class={`c-date-range-picker ${state.className}`.trim()}>
	<div class="c-drp__input-wrap">
		<input
			type="text"
			readonly
			disabled={state.disabled}
			class={`c-drp__input ${state.inputClass}`}
			value={state.displayValue}
			onclick={state.toggleOpen}
		/>
		{#if state.selectedRange.start}
			<button type="button" class="c-drp__clear-btn" onclick={state.clear} aria-label="Clear">
				<BaseIcon name={X} size={16} />
			</button>
		{/if}
	</div>

	{#if state.isOpen}
		<div class={`c-drp__panel ${state.calendarClass}`}>
			<div class="c-drp__nav">
				<button
					type="button"
					class="c-drp__nav-btn"
					onclick={state.previousMonth}
					aria-label="Previous month"
				>
					<BaseIcon name={ChevronLeft} size={16} />
				</button>
				<span class="c-drp__month-label">
					{state.currentDateView.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
				</span>
				<button
					type="button"
					class="c-drp__nav-btn"
					onclick={state.nextMonth}
					aria-label="Next month"
				>
					<BaseIcon name={ChevronRight} size={16} />
				</button>
			</div>

			<div class="c-drp__week-header">
				{#each ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as d}
					<div>{d}</div>
				{/each}
			</div>

			<div class="c-drp__days">
				{#each state.calendarDates as date}
					{#if date.getMonth() === state.currentDateView.getMonth()}
						<button
							type="button"
							class={`c-drp__day${state.inRange(date) ? ' c-drp__day--in-range' : ''}${state.isRangeEnd(date) ? ' c-drp__day--selected' : ''}`}
							onclick={() => state.pick(date)}
						>
							{date.getDate()}
						</button>
					{:else}
						<div class="c-drp__day-empty"></div>
					{/if}
				{/each}
			</div>

			<div class="c-drp__actions">
				<button type="button" class="c-drp__action" onclick={state.clear}>Clear</button>
				<button
					type="button"
					class="c-drp__action c-drp__action--primary"
					onclick={state.applySelection}
					disabled={!state.selectedRange.start || !state.selectedRange.end}
				>
					Apply
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.c-date-range-picker {
		position: relative;
		width: 100%;
	}

	.c-drp__input-wrap {
		position: relative;
	}

	.c-drp__input {
		box-sizing: border-box;
		width: 100%;
		padding-block: 0.5rem;
		padding-inline: 0.75rem 2.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-base, 0.375rem);
		background-color: var(--color-background-primary);
		cursor: pointer;
	}

	.c-drp__input:focus {
		outline: none;
		box-shadow: 0 0 0 2px var(--color-primary-200);
	}

	.c-drp__clear-btn {
		position: absolute;
		top: 50%;
		right: 0.5rem;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		color: var(--color-text-secondary);
	}

	.c-drp__panel {
		position: absolute;
		z-index: var(--z-index-docked);
		margin-block-start: 0.5rem;
		box-sizing: border-box;
		width: min(100vw - 2rem, 20rem);
		padding: 0.75rem;
		background-color: var(--color-background-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-large, 0.5rem);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.c-drp__nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-block-end: 0.5rem;
	}

	.c-drp__nav-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		border-radius: var(--border-radius-sm, 0.25rem);
		color: var(--color-text-secondary);
	}

	.c-drp__nav-btn:hover {
		background-color: var(--color-background-secondary);
	}

	.c-drp__month-label {
		font-size: var(--text-size-sm, 0.875rem);
		font-weight: 500;
	}

	.c-drp__week-header {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 0.25rem;
		margin-block-end: 0.25rem;
		text-align: center;
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
	}

	.c-drp__days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 0.25rem;
	}

	.c-drp__day {
		height: 2rem;
		border-radius: var(--border-radius-sm, 0.25rem);
		font-size: var(--text-size-xs, 0.75rem);
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-text-primary);
	}

	.c-drp__day:hover {
		background-color: var(--color-background-secondary);
	}

	.c-drp__day--in-range {
		background-color: var(--color-primary-100);
	}

	.c-drp__day--selected {
		background-color: var(--color-primary-500);
		color: var(--color-text-inverse);
	}

	.c-drp__day-empty {
		height: 2rem;
	}

	.c-drp__actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		margin-block-start: 0.75rem;
		padding-block-start: 0.5rem;
		border-top: 1px solid var(--color-border-primary);
	}

	.c-drp__action {
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-sm, 0.25rem);
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		padding: 0.375rem 0.75rem;
		cursor: pointer;
		font-size: var(--text-size-sm, 0.875rem);
	}

	.c-drp__action:hover {
		background-color: var(--color-background-secondary);
	}

	.c-drp__action--primary {
		border-color: var(--color-primary-500);
		background: var(--color-primary-500);
		color: var(--color-text-inverse);
	}

	.c-drp__action--primary:hover:not(:disabled) {
		background: var(--color-primary-600, var(--color-primary-500));
	}

	.c-drp__action--primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
