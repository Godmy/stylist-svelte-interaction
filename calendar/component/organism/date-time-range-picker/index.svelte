<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeDateTimeRangePicker } from '$stylist/calendar/interface/recipe/date-time-range-picker';
	import createDateTimeRangePickerState from './state.svelte';

	let uidCounter = 0;
	const X = 'x';

	let props: RecipeDateTimeRangePicker = $props();
	const state = createDateTimeRangePickerState(() => props);

	const fieldId = `dtrp-${uidCounter++}`;
</script>

<div class={`c-date-time-range-picker ${state.className}`.trim()}>
	<div class="c-dtrp__input-wrap">
		<input
			readonly
			disabled={state.disabled}
			class={`c-dtrp__input ${state.inputClass}`}
			value={state.selectedRange.start && state.selectedRange.end
				? `${state.fmt(state.selectedRange.start)} вЂ” ${state.fmt(state.selectedRange.end)}`
				: state.placeholder}
			onclick={state.toggleOpen}
		/>
		{#if state.selectedRange.start || state.selectedRange.end}
			<button type="button" class="c-dtrp__clear-btn" onclick={state.clear} aria-label="Clear">
				<BaseIcon name={X} size={16} />
			</button>
		{/if}
	</div>

	{#if state.isOpen}
		<div class={`c-dtrp__panel ${state.calendarClass}`}>
			<div class="c-dtrp__grid">
				<div class="c-dtrp__col">
					<div class="c-dtrp__col-header">Start</div>
					<label class="c-dtrp__field-label" for={`${fieldId}-start-date`}>Date</label>
					<input
						id={`${fieldId}-start-date`}
						type="date"
						class="c-dtrp__field-input"
						value={state.toDateInput(state.selectedRange.start)}
						onchange={(e) => state.changeDate('start', (e.target as HTMLInputElement).value)}
					/>
					<label class="c-dtrp__field-label" for={`${fieldId}-start-time`}>Time</label>
					<input
						id={`${fieldId}-start-time`}
						type="time"
						class="c-dtrp__field-input"
						value={state.toTimeInput(state.selectedRange.start)}
						onchange={(e) => {
							const [h, m] = (e.target as HTMLInputElement).value.split(':').map(Number);
							state.changeTimePart('start', h || 0, m || 0);
						}}
					/>
				</div>

				<div class="c-dtrp__col">
					<div class="c-dtrp__col-header">End</div>
					<label class="c-dtrp__field-label" for={`${fieldId}-end-date`}>Date</label>
					<input
						id={`${fieldId}-end-date`}
						type="date"
						class="c-dtrp__field-input"
						value={state.toDateInput(state.selectedRange.end)}
						onchange={(e) => state.changeDate('end', (e.target as HTMLInputElement).value)}
					/>
					<label class="c-dtrp__field-label" for={`${fieldId}-end-time`}>Time</label>
					<input
						id={`${fieldId}-end-time`}
						type="time"
						class="c-dtrp__field-input"
						value={state.toTimeInput(state.selectedRange.end)}
						onchange={(e) => {
							const [h, m] = (e.target as HTMLInputElement).value.split(':').map(Number);
							state.changeTimePart('end', h || 0, m || 0);
						}}
					/>
				</div>
			</div>

			{#if state.validationError}
				<p class="c-dtrp__error">{state.validationError}</p>
			{/if}

			<div class="c-dtrp__actions">
				<button type="button" class="c-dtrp__action" onclick={state.cancel}>Cancel</button>
				<button type="button" class="c-dtrp__action c-dtrp__action--primary" onclick={state.commit}>
					Apply
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.c-date-time-range-picker {
		position: relative;
		width: 100%;
	}

	.c-dtrp__input-wrap {
		position: relative;
	}

	.c-dtrp__input {
		box-sizing: border-box;
		width: 100%;
		padding-block: 0.5rem;
		padding-inline: 0.75rem 2.5rem;
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-base, 0.375rem);
		background-color: var(--color-background-primary);
		cursor: pointer;
	}

	.c-dtrp__clear-btn {
		position: absolute;
		top: 50%;
		right: 0.75rem;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		color: var(--color-text-secondary);
	}

	.c-dtrp__panel {
		position: absolute;
		z-index: var(--z-index-docked);
		margin-block-start: 0.5rem;
		box-sizing: border-box;
		width: min(100vw - 2rem, 26rem);
		padding: 1rem;
		background-color: var(--color-background-primary);
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-large, 0.5rem);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.c-dtrp__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	@media (max-width: 520px) {
		.c-dtrp__grid {
			grid-template-columns: 1fr;
		}
	}

	.c-dtrp__col-header {
		font-size: var(--text-size-sm, 0.875rem);
		font-weight: 600;
		margin-block-end: 0.5rem;
		color: var(--color-text-primary);
	}

	.c-dtrp__field-label {
		display: block;
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
		margin-block-end: 0.25rem;
		margin-block-start: 0.5rem;
	}

	.c-dtrp__field-input {
		box-sizing: border-box;
		width: 100%;
		border-radius: var(--border-radius-sm, 0.25rem);
		border: 1px solid var(--color-border-primary);
		padding: 0.375rem 0.5rem;
		font-size: var(--text-size-sm, 0.875rem);
	}

	.c-dtrp__error {
		margin-block: 0.5rem 0;
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-danger-600);
	}

	.c-dtrp__actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.5rem;
		margin-block-start: 0.75rem;
		padding-block-start: 0.5rem;
		border-top: 1px solid var(--color-border-primary);
	}

	.c-dtrp__action {
		border: 1px solid var(--color-border-primary);
		border-radius: var(--border-radius-sm, 0.25rem);
		background: var(--color-background-primary);
		color: var(--color-text-primary);
		padding: 0.375rem 0.75rem;
		cursor: pointer;
		font-size: var(--text-size-sm, 0.875rem);
	}

	.c-dtrp__action:hover {
		background-color: var(--color-background-secondary);
	}

	.c-dtrp__action--primary {
		border-color: var(--color-primary-500);
		background: var(--color-primary-500);
		color: var(--color-text-inverse);
	}

	.c-dtrp__action--primary:hover {
		background: var(--color-primary-600, var(--color-primary-500));
	}
</style>
