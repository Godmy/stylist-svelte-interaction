<script lang="ts">
	import CalendarGrid from '$stylist/calendar/component/molecule/calendar-grid/index.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import createCalendarState from './state.svelte';
	import type { RecipeCalendar } from '$stylist/calendar/interface/recipe/calendar';

	const ChevronLeft = 'chevron-left';
	const ChevronRight = 'chevron-right';

	let props: RecipeCalendar = $props();
	const state = createCalendarState(() => props);
</script>

<div class={['c-calendar', props.class].filter(Boolean).join(' ')}>
	<div class="c-calendar__header">
		<button
			type="button"
			class="c-calendar__nav"
			aria-label="Предыдущий месяц"
			disabled={!state.canGoPrev}
			onclick={() => state.navigateMonth(-1)}
		>
			<BaseIcon name={ChevronLeft} size={16} />
		</button>
		<span class="c-calendar__month">{state.monthLabel}</span>
		<button
			type="button"
			class="c-calendar__nav"
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
	/>
</div>

<style>
	.c-calendar {
		display: grid;
		gap: 0.75rem;
		width: 100%;
		box-sizing: border-box;
	}

	.c-calendar__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.c-calendar__month {
		font-weight: var(--font-weight-medium, 500);
		color: var(--color-text-primary);
		text-transform: capitalize;
	}

	.c-calendar__nav {
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

	.c-calendar__nav:hover:not(:disabled) {
		background: var(--color-background-secondary);
	}

	.c-calendar__nav:disabled {
		color: var(--color-text-tertiary, var(--color-text-secondary));
		opacity: var(--opacity-45, 0.45);
		cursor: not-allowed;
	}
</style>
