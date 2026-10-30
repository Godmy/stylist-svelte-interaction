<script lang="ts">
	import createEventCalendarState from '$stylist/calendar/component/organism/event-calendar/state.svelte';
	import type { RecipeEventCalendar } from '$stylist/calendar/interface/recipe/event-calendar';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';

	const ChevronLeft = 'chevron-left';
	const ChevronRight = 'chevron-right';

	let props: RecipeEventCalendar = $props();
	const state = createEventCalendarState(() => props);
</script>

<div class="{state.wrapperClasses} {state.className}" {...state.restProps}>
	<div class="{state.headerClasses} {state.headerClassProp}">
		<div class="c-event-calendar__header-left">
			<Button variant="ghost" size="sm" onclick={() => state.navigateCurrent(-1)}>
				<Icon name={ChevronLeft} class="_c1" />
			</Button>
			<Button
				variant="ghost"
				size="sm"
				onclick={state.navigateToToday}
				class="c-event-calendar__today-btn">{state.labels.today}</Button
			>
			<Button variant="ghost" size="sm" onclick={() => state.navigateCurrent(1)}>
				<Icon name={ChevronRight} class="_c1" />
			</Button>
			<h2 class="c-event-calendar__title">{state.displayTitle}</h2>
		</div>
		<div class="c-event-calendar__view-tabs">
			<Button
				variant={state.currentViewMode === 'day' ? 'primary' : 'ghost'}
				size="sm"
				onclick={() => state.changeViewMode('day')}>{state.labels.day}</Button
			>
			<Button
				variant={state.currentViewMode === 'week' ? 'primary' : 'ghost'}
				size="sm"
				onclick={() => state.changeViewMode('week')}>{state.labels.week}</Button
			>
			<Button
				variant={state.currentViewMode === 'month' ? 'primary' : 'ghost'}
				size="sm"
				onclick={() => state.changeViewMode('month')}>{state.labels.month}</Button
			>
		</div>
	</div>

	{#if props.children}
		<div class="c-event-calendar__content">
			{#if props.children}{@render props.children()}{/if}
		</div>
	{:else if state.currentViewMode === 'day' || state.currentViewMode === 'week'}
		<div
			class="c-event-calendar__day-week-grid c-event-calendar__day-week-grid--{state.currentViewMode}"
		>
			{#if state.currentViewMode === 'week'}
				{#each state.weekdays as day}
					<div class="{state.getWeekdayHeaderClasses()} {state.headerClassProp}">{day}</div>
				{/each}
			{/if}
			{#each state.days as day}
				<div class="c-event-calendar__day-col">
					<div class={state.getDateHeaderClasses(day.isToday)}>
						{state.formatWeekdayDay(day.date)}
					</div>
					<div class="c-event-calendar__day-events">
						{#if state.showAllDayEvents}
							{#each day.events as event}
								<div
									class="{state.getEventClasses(!!event.color, event.color)} {state.eventClass}"
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
								>
									{event.title}
									{#if state.showEventDuration && !event.allDay}
										<span class="c-event-calendar__event-time"
											>({state.formatTimeRange(event.start, event.end)})</span
										>
									{/if}
									{#if state.showEventDuration && event.allDay}
										<span class="c-event-calendar__event-time">({state.labels.allDay})</span>
									{/if}
								</div>
							{/each}
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class={state.getGridClasses()}>
			{#each state.weekdays as day}
				<div class="{state.getWeekdayHeaderClasses()} {state.headerClassProp}">{day}</div>
			{/each}
			{#each state.days as day}
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
					<div class={state.getDateNumberClasses(day.isToday)}>{day.date.getDate()}</div>
					<div class="c-event-calendar__day-events">
						{#if state.showAllDayEvents}
							{#each day.events as event}
								<div
									class="{state.getEventClasses(!!event.color, event.color)} {state.eventClass}"
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
								>
									{event.title}
									{#if state.showEventDuration && event.allDay}
										<span class="c-event-calendar__event-time">({state.labels.allDay})</span>
									{/if}
								</div>
							{/each}
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}

	{#if state.selectedEvent && state.showEventActions}
		<div class={state.getModalOverlayClasses()}>
			<div class={state.getModalContentClasses()}>
				<div class={state.getModalHeaderClasses()}>
					<h3 class="c-event-calendar__modal-title">{state.selectedEvent.title}</h3>
					<button onclick={state.closeEventActions} class="c-event-calendar__modal-close">×</button>
				</div>
				<div class="c-event-calendar__modal-body">
					{#if state.selectedEvent.description}
						<p class="c-event-calendar__modal-desc">{state.selectedEvent.description}</p>
					{/if}
					<div class="c-event-calendar__modal-meta">
						<p>
							{state.labels.start}: {state.formatMoment(
								state.selectedEvent.start,
								state.selectedEvent.allDay
							)}
						</p>
						<p>
							{state.labels.end}: {state.formatMoment(
								state.selectedEvent.end,
								state.selectedEvent.allDay
							)}
						</p>
						{#if state.selectedEvent.location}
							<p>{state.labels.location}: {state.selectedEvent.location}</p>
						{/if}
					</div>
				</div>
				{#if state.selectedEvent.href || state.canEdit || state.canDelete}
					<div class={state.getModalFooterClasses()}>
						<div class="c-event-calendar__modal-actions">
							{#if state.selectedEvent.href}
								<a class="c-event-calendar__modal-link" href={state.selectedEvent.href}
									>{state.labels.open}</a
								>
							{/if}
							{#if state.canEdit}
								<Button variant="secondary" size="sm" onclick={state.handleEventEdit}
									>{state.labels.edit}</Button
								>
							{/if}
							{#if state.canDelete}
								<Button variant="danger" size="sm" onclick={state.handleEventDelete}
									>{state.labels.delete}</Button
								>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	/* A flex column: given a height, the month grid stretches its weeks to fill it. */
	.c-event-calendar {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-2, 0.5rem);
		overflow: hidden;
		background: var(--color-background-primary);
		box-shadow: var(--shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05));
	}

	.c-event-calendar__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		padding: var(--space-6, 1.5rem);
		border-bottom: 1px solid var(--color-border-primary);
		background: var(--color-background-secondary);
	}

	.c-event-calendar__header-left {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25rem;
	}
	.c-event-calendar__today-btn {
		margin-inline: 0.5rem;
	}
	.c-event-calendar__title {
		margin-left: 1rem;
		font-weight: 700;
		color: var(--color-text-primary);
		font-size: var(--font-size-5, 1.25rem);
	}
	.c-event-calendar__view-tabs {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	.c-event-calendar__content {
		padding: 1rem;
	}

	.c-event-calendar__weekday {
		padding: var(--space-3, 0.75rem);
		text-align: center;
		font-size: var(--font-size-3, 0.75rem);
		font-weight: var(--font-weight-medium, 500);
		color: var(--color-text-secondary);
	}

	.c-event-calendar__day-week-grid {
		flex: 1;
		display: grid;
		overflow-x: auto;
	}

	.c-event-calendar__day-week-grid--day {
		grid-template-columns: minmax(16rem, 1fr);
	}

	.c-event-calendar__day-week-grid--week {
		grid-template-columns: repeat(7, minmax(9rem, 1fr));
	}

	.c-event-calendar__day-col {
		min-width: 0;
		border-right: 1px solid var(--color-border-primary);
		border-bottom: 1px solid var(--color-border-primary);
	}

	.c-event-calendar__date-header {
		padding: var(--space-3, 0.75rem);
		font-weight: var(--font-weight-semibold, 600);
		color: var(--color-text-secondary);
	}

	.c-event-calendar__date-header--today {
		background: color-mix(in srgb, var(--color-primary-500) 5%, transparent);
		color: var(--color-primary-700, var(--color-primary-600));
	}

	.c-event-calendar__day-events {
		padding: var(--space-3, 0.75rem);
	}

	.c-event-calendar__day-col .c-event-calendar__day-events {
		max-height: 25rem;
		overflow-y: auto;
	}

	.c-event-calendar__day .c-event-calendar__day-events {
		padding: 0;
	}

	/* Weeks share the height; a week with more events grows to fit them (a 1fr track
	   never shrinks below its content), and the grid scrolls under sticky weekdays. */
	.c-event-calendar__grid {
		flex: 1;
		min-height: 0;
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
		grid-template-rows: auto;
		grid-auto-rows: 1fr;
		overflow: auto;
	}

	.c-event-calendar__grid > .c-event-calendar__weekday {
		position: sticky;
		top: 0;
		z-index: 1;
		background: var(--color-background-primary);
	}

	.c-event-calendar__grid--month {
		grid-template-columns: repeat(7, minmax(0, 1fr));
	}

	.c-event-calendar__day {
		min-height: 6rem;
		min-width: 0;
		padding: var(--space-1, 0.25rem);
		border-top: 1px solid var(--color-border-secondary, var(--color-border-primary));
		border-right: 1px solid var(--color-border-secondary, var(--color-border-primary));
		position: relative;
		cursor: pointer;
	}

	.c-event-calendar__day:hover {
		background: var(--color-background-secondary);
	}
	.c-event-calendar__day--today {
		background: color-mix(in srgb, var(--color-primary-500) 5%, transparent);
	}
	.c-event-calendar__day--other {
		background: var(--color-background-tertiary, var(--color-background-secondary));
		color: var(--color-text-tertiary, var(--color-text-secondary));
	}

	.c-event-calendar__date-num {
		text-align: start;
		padding: var(--space-1, 0.25rem);
		font-weight: var(--font-weight-medium, 500);
	}
	.c-event-calendar__date-num--today {
		display: flex;
		width: 1.5rem;
		height: 1.5rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		background: var(--color-primary-600);
		color: var(--color-text-inverse, #fff);
	}

	.c-event-calendar__event {
		min-width: 0;
		font-size: var(--font-size-3, 0.75rem);
		padding: var(--space-1, 0.25rem);
		border-radius: var(--radius-1, 0.25rem);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
		background: color-mix(in srgb, var(--color-primary-500) 12%, transparent);
		color: var(--color-text-primary);
		margin-bottom: 0.125rem;
		transition: opacity var(--duration-150, 150ms) ease;
	}

	.c-event-calendar__event:hover {
		opacity: 0.9;
	}
	.c-event-calendar__event-time {
		margin-left: 0.25rem;
		color: var(--color-text-secondary);
		font-size: var(--font-size-3, 0.75rem);
	}

	.c-event-calendar__modal-overlay {
		position: fixed;
		inset: 0;
		background: rgb(0 0 0 / 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		padding: var(--space-6, 1.5rem);
	}

	.c-event-calendar__modal {
		background: var(--color-background-primary);
		border-radius: var(--radius-2, 0.5rem);
		box-shadow: var(--shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1));
		padding: var(--space-8, 2rem);
		max-width: 28rem;
		width: 100%;
		margin-inline: var(--space-4, 1rem);
	}

	.c-event-calendar__modal-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--space-4, 1rem);
	}
	.c-event-calendar__modal-title {
		font-weight: var(--font-weight-semibold, 600);
		color: var(--color-text-primary);
		margin: 0;
		font-size: var(--font-size-4-5, 1.125rem);
	}
	.c-event-calendar__modal-close {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--color-text-secondary);
		font-size: 1.25rem;
	}
	.c-event-calendar__modal-close:hover {
		color: var(--color-text-primary);
	}
	.c-event-calendar__modal-body {
		padding-block: var(--space-3, 0.75rem);
	}
	.c-event-calendar__modal-desc {
		color: var(--color-text-secondary);
		font-size: var(--font-size-3-5, 0.875rem);
	}
	.c-event-calendar__modal-meta {
		margin-top: var(--space-3, 0.75rem);
		color: var(--color-text-secondary);
		font-size: var(--font-size-3, 0.75rem);
	}
	.c-event-calendar__modal-footer {
		margin-top: var(--space-6, 1.5rem);
	}
	.c-event-calendar__modal-actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	.c-event-calendar__modal-link {
		color: var(--color-primary-600);
		font-weight: var(--font-weight-medium, 500);
	}

	@media (max-width: 640px) {
		.c-event-calendar__header {
			align-items: stretch;
		}

		.c-event-calendar__header-left,
		.c-event-calendar__view-tabs {
			width: 100%;
		}

		.c-event-calendar__title {
			width: 100%;
			margin-left: 0;
			margin-top: 0.5rem;
		}

		.c-event-calendar__grid,
		.c-event-calendar__grid--month {
			grid-template-columns: repeat(7, minmax(5.5rem, 1fr));
		}
	}

	._c1 {
		height: 1.25rem;
		width: 1.25rem;
	}
</style>
