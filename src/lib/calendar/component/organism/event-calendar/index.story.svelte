<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import EventCalendar from './index.svelte';
	import type { SlotCalendarEvent as RecipeCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';

	let {
		id = '',
		title = '',
		description = '',
		controls = [
			{
				name: 'viewMode',
				type: 'select',
				options: ['day', 'week', 'month'],
				defaultValue: 'month'
			},
			{ name: 'showAllDayEvents', type: 'boolean', defaultValue: true }
		]
	} = $props<{
		id?: string;
		title?: string;
		description?: string;
		controls?: SlotStory[];
	}>();

	// Sample events data
	const sampleEvents: RecipeCalendarEvent[] = [
		{
			id: '1',
			title: 'Team Meeting',
			start: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 10, 0),
			end: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 11, 30),
			description: 'Weekly team sync',
			color: '#3b82f6'
		},
		{
			id: '2',
			title: 'Lunch with Alex',
			start: new Date(new Date().getFullYear(), new Date().getMonth(), 16, 12, 0),
			end: new Date(new Date().getFullYear(), new Date().getMonth(), 16, 13, 0),
			description: 'Discuss new project',
			color: '#10b981'
		},
		{
			id: '3',
			title: 'Project Deadline',
			start: new Date(new Date().getFullYear(), new Date().getMonth(), 20, 17, 0),
			end: new Date(new Date().getFullYear(), new Date().getMonth(), 20, 18, 0),
			description: 'Submit final project',
			color: '#ef4444'
		},
		{
			id: '4',
			title: 'Conference Call',
			start: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 14, 0),
			end: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 15, 30),
			description: 'International partners',
			color: '#8b5cf6'
		}
	];

	// Event handlers
	function handleEventClick(event: RecipeCalendarEvent) {
		console.log('Event clicked:', event.title);
	}

	function handleEventCreate(date: Date) {
		console.log('Creating event on date:', date);
	}

	function handleEventEdit(event: RecipeCalendarEvent) {
		console.log('Editing event:', event.title);
	}

	function handleEventDelete(event: RecipeCalendarEvent) {
		console.log('Deleting event:', event.title);
	}
</script>

<Story {id} {title} {description} component={EventCalendar} category="Organisms" {controls}>
	{#snippet children(values: any)}
		<section class="sb-organisms-event-calendar _c1">
			<div class="_c2">
				<p class="_c3">Primary Event Calendar Example</p>
				<p class="_c4">Interactive calendar with event management features.</p>

				<div class="_c5">
					<EventCalendar
						events={sampleEvents as any}
						initialDate={new Date()}
						viewMode={values.viewMode}
						showAllDayEvents={values.showAllDayEvents}
						onEventClick={handleEventClick}
						onEventCreate={handleEventCreate}
						onEventEdit={handleEventEdit}
						onEventDelete={handleEventDelete}
					/>
				</div>
			</div>

			<div class="_c6">
				<h3 class="_c7">Calendar Variations</h3>
				<p class="_c8">Different calendar views: day, week, and month with sample events.</p>

				<div class="_c9">
					<article class="_c10">
						<p class="_c11">Week View</p>
						<div class="_c12">
							<EventCalendar
								events={sampleEvents as any}
								initialDate={new Date()}
								viewMode="week"
								showAllDayEvents={true}
								onEventClick={handleEventClick}
							/>
						</div>
					</article>

					<article class="_c10">
						<p class="_c11">Day View</p>
						<div class="_c12">
							<EventCalendar
								events={sampleEvents as any}
								initialDate={new Date()}
								viewMode="day"
								showAllDayEvents={true}
								onEventClick={handleEventClick}
							/>
						</div>
					</article>

					<article class="_c10">
						<p class="_c11">Month View with Limited Events</p>
						<div class="_c12">
							<EventCalendar
								events={sampleEvents.slice(0, 2) as any}
								initialDate={new Date()}
								viewMode="month"
								showAllDayEvents={true}
								onEventClick={handleEventClick}
							/>
						</div>
					</article>
				</div>
			</div>
		</section>
	{/snippet}
</Story>

<style>
	._c1 {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 2rem;
	}
	._c10 {
		border-radius: 0.5rem;
		border-width: 1px;
		border-style: dashed;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1rem;
	}
	._c11 {
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c12 {
		height: 20rem;
	}
	._c2 {
		border-radius: 0.5rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-primary);
		padding: 1.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c3 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-weight: 600;
		letter-spacing: 0.025em;
		color: var(--color-text-secondary);
		text-transform: uppercase;
	}
	._c4 {
		margin-top: 0.25rem;
		color: var(--color-text-primary);
	}
	._c5 {
		margin-top: 1.5rem;
	}
	._c6 {
		border-radius: 0.5rem;
		border-width: 1px;
		border-style: solid;
		border-color: var(--color-border-primary);
		background-color: var(--color-background-secondary);
		padding: 1.5rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
	}
	._c7 {
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}
	._c8 {
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-text-secondary);
	}
	._c9 {
		margin-top: 1.25rem;
	}
	._c9 > * + * {
		margin-top: 1rem;
	}
</style>
