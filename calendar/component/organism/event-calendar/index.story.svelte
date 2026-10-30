<script lang="ts">
	import EventCalendar from '$stylist/calendar/component/organism/event-calendar/index.svelte';
	import type { RecipeEventCalendar } from '$stylist/calendar/interface/recipe/event-calendar';
	import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';

	// Render of index.story.ts: the events and the initial date are Dates of the current month.
	let args: RecipeEventCalendar = $props();

	const year = new Date().getFullYear();
	const month = new Date().getMonth();
	const sampleEvents: SlotCalendarEvent[] = [
		{
			id: '1',
			title: 'Team Meeting',
			start: new Date(year, month, 15, 10, 0),
			end: new Date(year, month, 15, 11, 30),
			description: 'Weekly team sync',
			color: '#3b82f6'
		},
		{
			id: '2',
			title: 'Lunch with Alex',
			start: new Date(year, month, 16, 12, 0),
			end: new Date(year, month, 16, 13, 0),
			description: 'Discuss new project',
			color: '#10b981'
		},
		{
			id: '3',
			title: 'Project Deadline',
			start: new Date(year, month, 20, 17, 0),
			end: new Date(year, month, 20, 18, 0),
			description: 'Submit final project',
			color: '#ef4444'
		},
		{
			id: '4',
			title: 'Conference Call',
			start: new Date(year, month, 25, 14, 0),
			end: new Date(year, month, 25, 15, 30),
			description: 'International partners',
			color: '#8b5cf6'
		},
		{
			id: '5',
			title: 'Offsite trip',
			start: new Date(year, month, 8),
			end: new Date(year, month, 10),
			allDay: true,
			description: 'Multi-day event: shown on each of its days',
			href: '#offsite'
		}
	];
</script>

<EventCalendar {...args} events={sampleEvents} initialDate={new Date()} />
