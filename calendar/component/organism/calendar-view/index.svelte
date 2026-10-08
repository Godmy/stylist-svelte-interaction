<script lang="ts">
	import createCalendarViewState from './state.svelte';
	import type { RecipeCalendarView as CalendarViewStateProps } from '$stylist/calendar/interface/recipe/calendar-view';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';

	const ChevronLeft = 'chevron-left';
	const ChevronRight = 'chevron-right';
	const Plus = 'plus';

	let props: CalendarViewStateProps = $props();
	const state = createCalendarViewState(() => props);
</script>

<div class={state.wrapperClasses} {...state.restProps}>
	<div class={state.headerClasses}>
		<div class="c-calendar-view__header-left">
			<Button
				variant="ghost"
				size="sm"
				class={state.navigationButtonClasses}
				onclick={() => state.navigateMonth(-1)}
			>
				<Icon name={ChevronLeft} class="_c1" />
			</Button>
			<Button
				variant="ghost"
				size="sm"
				class={state.todayButtonClasses}
				onclick={state.navigateToToday}
			>
				Today
			</Button>
			<Button
				variant="ghost"
				size="sm"
				class={state.navigationButtonClasses}
				onclick={() => state.navigateMonth(1)}
			>
				<Icon name={ChevronRight} class="_c1" />
			</Button>
			<h2 class="c-calendar-view__month-year">{state.monthYear}</h2>
		</div>
		<div class="c-calendar-view__view-tabs">
			<Button
				variant={state.viewMode === 'month' ? 'primary' : 'ghost'}
				size="sm"
				class={state.getViewToggleButtonClasses(state.viewMode === 'month')}
				onclick={() => state.changeViewMode('month')}>Month</Button
			>
			<Button
				variant={state.viewMode === 'week' ? 'primary' : 'ghost'}
				size="sm"
				class={state.getViewToggleButtonClasses(state.viewMode === 'week')}
				onclick={() => state.changeViewMode('week')}>Week</Button
			>
			<Button
				variant={state.viewMode === 'day' ? 'primary' : 'ghost'}
				size="sm"
				class={state.getViewToggleButtonClasses(state.viewMode === 'day')}
				onclick={() => state.changeViewMode('day')}>Day</Button
			>
		</div>
	</div>

	{#if props.children}
		<div class="c-calendar-view__content">
			{#if props.children}{@render props.children()}{/if}
		</div>
	{:else}
		<div class={state.gridClasses}>
			{#if state.showWeekNumbers}
				<div class={state.getWeekNumberClasses()}></div>
			{/if}
			{#each state.weekdays as day}
				<div class={state.weekdayHeaderClasses}>{day}</div>
			{/each}
			{#each state.days as day, index}
				<div
					class="{state.getDayCellClasses(day.isToday, day.isCurrentMonth)} {state.dayClass}"
					role="button"
					tabindex="0"
					onclick={() => state.handleDayClick(day.date)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							state.handleDayClick(day.date);
						}
					}}
				>
					<div class="c-calendar-view__day-head">
						<span class={state.getDateNumberClasses(day.isToday)}>{day.date.getDate()}</span>
						<button
							class={state.getAddEventButtonClasses()}
							onclick={(e) => {
								e.stopPropagation();
								state.handleAddEvent(day.date);
							}}
						>
							<Icon name={Plus} class="_c2" />
						</button>
					</div>
					<div class="c-calendar-view__events">
						{#each day.events as event}
							<div
								class="{state.getEventItemClasses(event.color)} {state.eventClass}"
								style={event.color ? `background-color: ${event.color}` : undefined}
								role="button"
								tabindex="0"
								onclick={(e) => {
									e.stopPropagation();
									state.handleEventClick(event);
								}}
								onkeydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										e.stopPropagation();
										state.handleEventClick(event);
									}
								}}
							>
								{event.title}
							</div>
						{/each}
					</div>
				</div>
				{#if state.showWeekNumbers}
					{#if (index + 1) % 7 === 0}
						<div class={state.getWeekNumberClasses()}></div>
					{/if}
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.c-calendar-view {
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg, 0.5rem);
		overflow: hidden;
	}

	.c-calendar-view__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		padding: var(--spacing-lg, 1.5rem);
		border-bottom: 1px solid var(--color-border-primary);
	}

	.c-calendar-view__header-left {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.c-calendar-view__month-year {
		margin-left: 1rem;
		margin-block: 0;
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-text-primary);
	}

	.c-calendar-view__view-tabs {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.c-calendar-view__nav-btn {
		width: var(--spacing-xl, 2rem);
		height: var(--spacing-xl, 2rem);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-md, 0.375rem);
	}

	.c-calendar-view__nav-btn:hover {
		background: var(--color-background-secondary);
	}

	.c-calendar-view__today-btn {
		margin-inline: var(--spacing-sm, 0.75rem);
		height: var(--spacing-xl, 2rem);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-md, 0.375rem);
	}

	.c-calendar-view__today-btn:hover {
		background: var(--color-background-secondary);
	}

	.c-calendar-view__view-btn {
		height: var(--spacing-xl, 2rem);
		padding-inline: var(--spacing-md, 1rem);
		border-radius: var(--radius-md, 0.375rem);
		display: flex;
		align-items: center;
	}

	.c-calendar-view__view-btn:hover {
		background: var(--color-background-secondary);
	}

	.c-calendar-view__view-btn--active {
		background: var(--color-primary-500);
		color: var(--color-text-inverse);
	}

	.c-calendar-view__grid {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
		overflow-x: auto;
	}

	.c-calendar-view__grid--day {
		grid-template-columns: minmax(16rem, 1fr);
	}

	.c-calendar-view__grid--week {
		grid-template-columns: repeat(7, minmax(8rem, 1fr));
	}

	.c-calendar-view__weekday {
		padding: var(--spacing-sm, 0.75rem);
		text-align: center;
		font-size: var(--text-size-xs, 0.75rem);
		font-weight: var(--font-weight-medium, 500);
		color: var(--color-text-secondary);
		background: var(--color-background-secondary);
	}

	.c-calendar-view__day {
		min-height: var(--spacing-24, 6rem);
		min-width: 0;
		padding: var(--spacing-sm, 0.75rem);
		border-top: 1px solid var(--color-border-primary);
		border-right: 1px solid var(--color-border-primary);
		cursor: pointer;
	}

	.c-calendar-view__day:hover {
		background: var(--color-background-secondary);
	}

	.c-calendar-view__day--today {
		background: color-mix(in srgb, var(--color-primary-500) 5%, transparent);
	}

	.c-calendar-view__day--other {
		background: var(--color-background-tertiary, var(--color-background-secondary));
		color: var(--color-text-tertiary, var(--color-text-secondary));
	}

	.c-calendar-view__day-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.c-calendar-view__date-num {
		font-size: var(--text-size-sm, 0.875rem);
	}

	.c-calendar-view__date-num--today {
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--spacing-6, 1.5rem);
		height: var(--spacing-6, 1.5rem);
		border-radius: 9999px;
		background: var(--color-primary-500);
		color: var(--color-text-inverse);
		font-size: var(--text-size-sm, 0.875rem);
	}

	.c-calendar-view__add-btn {
		display: inline-flex;
		width: 1.5rem;
		height: 1.5rem;
		flex: 0 0 auto;
		align-items: center;
		justify-content: center;
		color: var(--color-text-tertiary, var(--color-text-secondary));
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
	}
	.c-calendar-view__add-btn:hover {
		color: var(--color-text-primary);
	}

	.c-calendar-view__events {
		margin-top: 0.25rem;
		max-height: 5rem;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.c-calendar-view__event {
		min-width: 0;
		font-size: var(--text-size-xs, 0.75rem);
		padding: var(--spacing-xs, 0.25rem);
		border-radius: 0.25rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
		background: color-mix(in srgb, var(--color-primary-500) 12%, transparent);
		color: var(--color-text-primary);
	}

	.c-calendar-view__week-num {
		padding: var(--spacing-sm, 0.75rem);
		font-size: var(--text-size-xs, 0.75rem);
		font-weight: var(--font-weight-medium, 500);
		color: var(--color-text-secondary);
		background: var(--color-background-tertiary, var(--color-background-secondary));
	}

	.c-calendar-view__content {
		padding: 1rem;
	}

	@media (max-width: 640px) {
		.c-calendar-view__header {
			align-items: stretch;
		}

		.c-calendar-view__header-left,
		.c-calendar-view__view-tabs {
			width: 100%;
		}

		.c-calendar-view__month-year {
			width: 100%;
			margin-left: 0;
			margin-top: 0.5rem;
		}

		.c-calendar-view__grid {
			grid-template-columns: repeat(7, minmax(5.5rem, 1fr));
		}

		.c-calendar-view__grid--day {
			grid-template-columns: minmax(16rem, 1fr);
		}

		.c-calendar-view__grid--week {
			grid-template-columns: repeat(7, minmax(8rem, 1fr));
		}
	}

	._c1 {
		height: 1.25rem;
		width: 1.25rem;
	}
	._c2 {
		height: 1rem;
		width: 1rem;
	}
</style>
