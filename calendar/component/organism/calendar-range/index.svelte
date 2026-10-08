<script lang="ts">
	import CalendarGrid from '$stylist/calendar/component/molecule/calendar-grid/index.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import createCalendarRangeState from './state.svelte';
	import type { RecipeCalendarRange } from '$stylist/calendar/interface/recipe/calendar-range';

	const ChevronLeft = 'chevron-left';
	const ChevronRight = 'chevron-right';

	let props: RecipeCalendarRange = $props();
	const state = createCalendarRangeState(() => props);
</script>

<div class={['c-calendar-range', props.class].filter(Boolean).join(' ')}>
	<div class="c-calendar-range__header">
		<button
			type="button"
			class="c-calendar-range__nav"
			aria-label="Предыдущий месяц"
			disabled={!state.canGoPrev}
			onclick={() => state.navigateMonth(-1)}
		>
			<BaseIcon name={ChevronLeft} size={16} />
		</button>
		<span class="c-calendar-range__month">{state.monthLabel}</span>
		<button
			type="button"
			class="c-calendar-range__nav"
			aria-label="Следующий месяц"
			disabled={!state.canGoNext}
			onclick={() => state.navigateMonth(1)}
		>
			<BaseIcon name={ChevronRight} size={16} />
		</button>
	</div>

	<CalendarGrid
		days={state.days}
		weekdayLabels={state.weekdayLabels}
		accentColor={state.accentColor}
		onDaySelect={state.handleDaySelect}
		onDayHover={state.handleDayHover}
	/>
</div>

<style>
	.c-calendar-range {
		display: grid;
		gap: 0.75rem;
		width: 100%;
		box-sizing: border-box;
	}

	.c-calendar-range__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.c-calendar-range__month {
		font-weight: var(--font-weight-medium, 500);
		color: var(--color-text-primary);
		text-transform: capitalize;
	}

	.c-calendar-range__nav {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border: 0;
		border-radius: 999px;
		background: transparent;
		color: var(--color-text-primary);
		cursor: pointer;
	}

	.c-calendar-range__nav:hover:not(:disabled) {
		background: var(--color-background-secondary);
	}

	.c-calendar-range__nav:disabled {
		color: var(--color-text-tertiary, var(--color-text-secondary));
		opacity: var(--opacity-45, 0.45);
		cursor: not-allowed;
	}
</style>
