<script lang="ts">
	import createTimeGridState from './state.svelte';
	import type { RecipeTimeGrid as TimeGridStateProps } from '$stylist/calendar/interface/recipe/time-grid';
	import TimeSlotComponent from '$stylist/calendar/component/atom/time-slot/index.svelte';
	import Button from '$stylist/button/component/atom/button/index.svelte';
	import Icon from '$stylist/svg/component/atom/icon/index.svelte';

	let props: TimeGridStateProps = $props();
	const state = createTimeGridState(() => props);
</script>

<div class={state.wrapperClasses} {...state.restProps}>
	{#if state.showHeader}
		<div class={state.headerClasses}>
			<div class="c-time-grid__header-left">
				<Button variant="ghost" size="sm" onclick={() => state.navigateWeek(-1)}>
					<Icon name="chevron-down" direction="left" size="md" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onclick={state.navigateToToday}
					class="c-time-grid__today-btn"
				>
					Today
				</Button>
				<Button variant="ghost" size="sm" onclick={() => state.navigateWeek(1)}>
					<Icon name="chevron-down" direction="right" size="md" />
				</Button>
				<h2 class="c-time-grid__title">
					{state.viewStartDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
				</h2>
			</div>
			<div class="c-time-grid__view-tabs">
				{#each ['day', 'week', 'month'] as mode}
					<Button
						variant={state.currentViewMode === mode ? 'primary' : 'secondary'}
						size="sm"
						onclick={() => state.changeViewMode(mode as 'day' | 'week' | 'month')}
					>
						{mode.charAt(0).toUpperCase() + mode.slice(1)}
					</Button>
				{/each}
			</div>
		</div>
	{/if}

	{#if props.children}
		<div class="c-time-grid__content">
			{@render props.children()}
		</div>
	{:else if state.variant === 'schedule'}
		<!-- Schedule variant: vertical list with time gutter -->
		<div class={`${state.timeGridClasses} c-time-grid__grid--schedule`}>
			{#if state.showTimeGutter}
				<div class="c-time-grid__gutter">
					<div class="c-time-grid__gutter-spacer"></div>
					{#each state.timeGutterSlots as gutterSlot}
						<div class="c-time-grid__gutter-slot" style={`height: ${state.timeSlotHeight}px;`}>
							{gutterSlot.time}
						</div>
					{/each}
				</div>
			{/if}

			{#each state.timeGrid as day}
				<div class={state.getDayColumnClasses(day.date)}>
					<div class={state.getDayHeaderClasses(day.date)}>
						<div class="c-time-grid__day-name">{day.dayOfWeek}</div>
						<div class="c-time-grid__day-date">{day.dateStr}</div>
					</div>

					{#each day.slots as slot}
						<TimeSlotComponent
							start={slot.start}
							end={slot.end}
							timeLabel={slot.timeLabel}
							available={true}
							events={slot.events}
							class={state.slotClass}
							onClick={() => state.handleSlotClick(day.date, slot.hour ?? 0, slot.minute ?? 0)}
						/>

						{#each slot.events as event}
							<div
								class={`${state.getEventClasses(event.color)} c-time-grid__event--card`}
								style={event.color ? `border-left: 3px solid ${event.color};` : ''}
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
								<div class="c-time-grid__event-title">{event.title}</div>
								<div class="c-time-grid__event-time">
									{event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
								</div>
								{#if event.location}
									<div class="c-time-grid__event-location">
										<Icon name="map-pin" size="xs" />
										<span class="c-time-grid__event-loc-text">{event.location}</span>
									</div>
								{/if}
								{#if event.priority}
									<span class={state.getPriorityBadgeClasses(event.priority)}>
										{event.priority}
									</span>
								{/if}
							</div>
						{/each}
					{/each}
				</div>
			{/each}
		</div>
	{:else}
		<!-- Grid variant: horizontal columns with absolute events -->
		<div class={state.timeGridClasses}>
			{#if state.showCurrentTimeIndicator && state.isTodayDate(state.viewStartDate)}
				<div
					class={state.getTimeIndicatorClasses()}
					style={`top: ${state.getCurrentTimePosition()}px;`}
				></div>
			{/if}

			{#each state.timeGrid as day}
				<div class={state.getDayColumnClasses(day.date)}>
					<div class={state.getDayHeaderClasses(day.date)}>
						<div class="c-time-grid__day-name">{day.dayOfWeek}</div>
						<div class="c-time-grid__day-date">{day.dateStr}</div>
					</div>

					<div class="c-time-grid__day-body" style={`height: ${state.getColumnHeight()}px;`}>
						{#each day.slots as slot}
							<div
								class="c-time-grid__slot-row"
								style={`height: ${state.getSlotHeight()}px;`}
								role="button"
								tabindex="0"
								onclick={() => state.handleSlotClick(day.date, slot.hour ?? 0, slot.minute ?? 0)}
								onkeydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										state.handleSlotClick(day.date, slot.hour ?? 0, slot.minute ?? 0);
									}
								}}
							>
								<TimeSlotComponent
									start={slot.start}
									end={slot.end}
									timeLabel={slot.timeLabel}
									available={slot.available}
									events={slot.events}
									class={state.getTimeSlotClasses()}
									onClick={() => state.handleSlotClick(day.date, slot.hour ?? 0, slot.minute ?? 0)}
								/>
							</div>
						{/each}

						{#if state.showAllDayEvents}
							{#each day.slots as slot, slotIndex}
								{#each slot.events as event}
									<div
										class={state.getEventClasses(event.color)}
										style={`top: ${slotIndex * state.getSlotHeight()}px; height: ${state.getSlotHeight()}px;${event.color ? ` background-color: ${event.color};` : ''}`}
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
										<div class="c-time-grid__event-title">{event.title}</div>
										{#if event.location}
											<div class="c-time-grid__event-location">
												<Icon name="map-pin" size="xs" class="c-time-grid__event-icon" />
												<span class="c-time-grid__event-loc-text">{event.location}</span>
											</div>
										{/if}
									</div>
								{/each}
							{/each}
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.c-time-grid {
		border: 1px solid var(--color-border-primary);
		border-radius: var(--radius-lg, 0.5rem);
		overflow: auto;
	}

	.c-time-grid__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		padding: var(--spacing-lg, 1.5rem);
		border-bottom: 1px solid var(--color-border-primary);
	}

	.c-time-grid__header-left {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.c-time-grid__today-btn {
		margin-inline: 0.5rem;
	}

	.c-time-grid__title {
		margin-left: 1rem;
		font-weight: var(--font-weight-semibold, 600);
		color: var(--color-text-primary);
		font-size: var(--text-size-lg, 1.125rem);
	}

	.c-time-grid__view-tabs {
		display: flex;
		gap: var(--spacing-sm, 0.75rem);
		flex-wrap: wrap;
	}

	.c-time-grid__content {
		padding: 1rem;
	}

	/* Grid variant */
	.c-time-grid__grid {
		display: grid;
		grid-template-columns: repeat(8, minmax(0, 1fr));
		min-width: max-content;
		height: calc(100vh - 12.5rem);
	}

	/* Schedule variant */
	.c-time-grid__grid--schedule {
		display: flex;
		flex-direction: row;
		min-width: 0;
	}

	.c-time-grid__gutter {
		min-width: 4rem;
		border-right: 1px solid var(--color-border-primary);
		flex-shrink: 0;
	}

	.c-time-grid__gutter-spacer {
		height: var(--spacing-xl, 2rem);
	}

	.c-time-grid__gutter-slot {
		padding: var(--spacing-xs, 0.25rem) var(--spacing-sm, 0.75rem);
		border-bottom: 1px solid var(--color-border-secondary, var(--color-border-primary));
		text-align: right;
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
	}

	.c-time-grid__day-col {
		border-right: 1px solid var(--color-border-primary);
	}

	.c-time-grid__day-col--weekend {
		background: var(--color-background-tertiary, var(--color-background-secondary));
	}

	.c-time-grid__day-header {
		padding: var(--spacing-sm, 0.75rem);
		text-align: center;
		font-size: var(--text-size-sm, 0.875rem);
		font-weight: var(--font-weight-medium, 500);
	}

	.c-time-grid__day-header--today {
		background: color-mix(in srgb, var(--color-primary-500) 10%, transparent);
	}

	.c-time-grid__day-name {
		font-weight: var(--font-weight-semibold, 600);
	}

	.c-time-grid__day-date {
		color: var(--color-text-secondary);
	}

	.c-time-grid__day-body {
		position: relative;
	}

	.c-time-grid__slot-row {
		display: flex;
		flex-direction: column;
	}

	.c-time-grid__slot {
		border-bottom: 1px solid var(--color-border-secondary, var(--color-border-primary));
		position: relative;
	}

	.c-time-grid__now-indicator {
		position: absolute;
		width: 100%;
		height: 2px;
		background: var(--color-danger-500);
		z-index: 10;
	}

	.c-time-grid__event {
		position: absolute;
		left: var(--spacing-xs, 0.25rem);
		right: var(--spacing-xs, 0.25rem);
		padding: var(--spacing-xs, 0.25rem);
		font-size: var(--text-size-xs, 0.75rem);
		border-radius: var(--radius-sm, 0.25rem);
		overflow: hidden;
		cursor: pointer;
		background: color-mix(in srgb, var(--color-primary-500) 12%, transparent);
		color: var(--color-text-primary);
	}

	/* Event card for schedule variant */
	.c-time-grid__event--card {
		position: static;
		margin-block-end: 0.25rem;
		padding: 0.375rem 0.5rem;
		border-radius: var(--radius-sm, 0.25rem);
		border-left: 3px solid var(--color-primary-500);
		background: color-mix(in srgb, var(--color-primary-500) 8%, transparent);
	}

	.c-time-grid__event-title {
		font-weight: var(--font-weight-medium, 500);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.c-time-grid__event-time {
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
	}

	.c-time-grid__event-location {
		display: flex;
		align-items: center;
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
		gap: 0.125rem;
	}

	.c-time-grid__event-icon {
		width: 0.625rem;
		height: 0.625rem;
	}

	.c-time-grid__event-loc-text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.c-time-grid__priority {
		display: inline-flex;
		align-items: center;
		padding: 0.125rem 0.375rem;
		border-radius: 9999px;
		font-size: var(--text-size-2xs, 0.625rem);
		font-weight: var(--font-weight-medium, 500);
		margin-block-start: 0.25rem;
	}

	.c-time-grid__priority--high,
	.c-time-grid__priority--urgent,
	.c-time-grid__priority--critical {
		background: color-mix(in srgb, var(--color-danger-500) 12%, transparent);
		color: var(--color-danger-800, var(--color-danger-700));
	}

	.c-time-grid__priority--medium {
		background: color-mix(in srgb, var(--color-warning-500) 12%, transparent);
		color: var(--color-warning-800, var(--color-warning-700));
	}

	.c-time-grid__priority--low {
		background: color-mix(in srgb, var(--color-success-500) 12%, transparent);
		color: var(--color-success-800, var(--color-success-700));
	}
</style>
