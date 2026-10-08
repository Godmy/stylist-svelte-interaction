<script lang="ts">
	import createMiniCalendarState from './state.svelte';
	import type { RecipeMiniCalendar as MiniCalendarStateProps } from '$stylist/calendar/interface/recipe/mini-calendar';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';

	const ChevronLeft = 'chevron-left';
	const ChevronRight = 'chevron-right';

	let props: MiniCalendarStateProps = $props();
	const state = createMiniCalendarState(() => props);
</script>

<div class={state.wrapperClasses} {...state.restProps}>
	<div class={state.headerClasses}>
		<Button variant="ghost" size="sm" onclick={() => state.navigateMonth(-1)}>
			<BaseIcon name={ChevronLeft} class="_c1" />
		</Button>
		<div class="c-mini-calendar__month-year">{state.monthYear}</div>
		<div class="c-mini-calendar__header-right">
			{#if state.showToday}
				<Button variant="ghost" size="sm" onclick={state.navigateToToday} title="Today">
					<span class="c-mini-calendar__today-label">Today</span>
				</Button>
			{/if}
			<Button variant="ghost" size="sm" onclick={() => state.navigateMonth(1)}>
				<BaseIcon name={ChevronRight} class="_c1" />
			</Button>
		</div>
	</div>

	<div class={state.gridClasses}>
		{#if state.showWeekNumbers}
			<div class="c-mini-calendar__week-num-header"></div>
		{/if}
		{#each state.weekdays as day}
			<div class={state.weekdayHeaderClasses}>{day}</div>
		{/each}
		{#each state.days as day}
			<button
				type="button"
				class={state.getDayCellClasses(day.isToday, day.isCurrentMonth, day.hasEvent ?? false)}
				onclick={() => state.handleDateSelect(day.date)}
				aria-label={day.date.toISOString()}
			>
				<div class={state.getDateNumberClasses()}>
					<span>{day.date.getDate()}</span>
					{#if day.hasEvent && !state.compact}
						<div class="c-mini-calendar__event-dots">
							{#each day.events.slice(0, 2) as event}
								<div
									class={state.getEventIndicatorClasses(event.color)}
									style={event.color ? `background-color: ${event.color}` : undefined}
									role="button"
									tabindex="0"
									onclick={(e) => state.handleEventClick(event, e)}
									onkeydown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											state.handleEventClick(event, e);
										}
									}}
									title={event.title}
								></div>
							{/each}
							{#if day.events.length > 2}
								<div class="c-mini-calendar__event-more">+{day.events.length - 2}</div>
							{/if}
						</div>
					{/if}
				</div>
			</button>
		{/each}
	</div>
</div>

<style>
	.c-mini-calendar {
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg, 0.5rem);
		overflow: hidden;
		font-size: var(--text-size-sm, 0.875rem);
		background: var(--color-background-primary);
	}

	.c-mini-calendar--compact {
		font-size: var(--text-size-xs, 0.75rem);
	}

	.c-mini-calendar__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: var(--spacing-xs, 0.25rem);
		border-bottom: 1px solid var(--color-border-primary);
	}

	.c-mini-calendar__month-year {
		font-weight: var(--font-weight-medium, 500);
		color: var(--color-text-primary);
		text-align: center;
	}

	.c-mini-calendar__header-right {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs, 0.25rem);
	}

	.c-mini-calendar__today-label {
		font-size: var(--text-size-xs, 0.75rem);
	}

	.c-mini-calendar__grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		min-width: 0;
	}

	.c-mini-calendar__weekday {
		padding: var(--spacing-xs, 0.25rem);
		text-align: center;
		font-weight: var(--font-weight-medium, 500);
		color: var(--color-text-secondary);
	}

	.c-mini-calendar__day {
		min-height: var(--spacing-xl, 2rem);
		aspect-ratio: 1 / 1;
		padding: var(--spacing-xs, 0.25rem);
		text-align: center;
		border-top: 1px solid var(--color-border-secondary, var(--color-border-primary));
		border-right: 1px solid var(--color-border-secondary, var(--color-border-primary));
		cursor: pointer;
		background: none;
		font: inherit;
	}

	.c-mini-calendar__day:hover {
		background: var(--color-background-secondary);
	}

	.c-mini-calendar__day--today {
		background: color-mix(in srgb, var(--color-primary-500) 10%, transparent);
		font-weight: var(--font-weight-bold, 700);
	}

	.c-mini-calendar__day--other {
		color: var(--color-text-tertiary, var(--color-text-secondary));
	}

	.c-mini-calendar__day--has-event {
		color: var(--color-primary-600);
	}

	.c-mini-calendar__date-num {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.c-mini-calendar__event-dots {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--spacing-1, 0.25rem);
		margin-top: var(--spacing-1, 0.25rem);
	}

	.c-mini-calendar__event-dot {
		width: var(--spacing-xs, 0.25rem);
		height: var(--spacing-xs, 0.25rem);
		border-radius: 9999px;
		background: var(--color-primary-500);
	}

	.c-mini-calendar__event-more {
		font-size: var(--text-size-2xs, 0.625rem);
		color: var(--color-text-secondary);
	}

	._c1 {
		height: 1rem;
		width: 1rem;
	}
</style>
