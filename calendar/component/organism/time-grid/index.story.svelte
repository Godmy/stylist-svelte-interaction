<script lang="ts">
	import TimeGrid from '$stylist/calendar/component/organism/time-grid/index.svelte';
	import type { RecipeTimeGrid } from '$stylist/calendar/interface/recipe/time-grid';
	import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';

	// Render of index.story.ts: the visible week and the events are Dates relative to today.
	let args: RecipeTimeGrid = $props();

	function at(dayOffset: number, hours: number, minutes = 0): Date {
		const date = new Date();
		date.setDate(date.getDate() + dayOffset);
		date.setHours(hours, minutes, 0, 0);
		return date;
	}

	const sampleEvents: SlotCalendarEvent[] = [
		{
			id: '1',
			title: 'Team Meeting',
			start: at(0, 10),
			end: at(0, 11, 30),
			location: 'Conference Room A',
			color: '#3b82f6',
			allDay: false
		},
		{
			id: '2',
			title: 'Design Review',
			start: at(1, 14),
			end: at(1, 15, 30),
			location: 'Design Studio',
			color: '#10b981',
			allDay: false
		},
		{
			id: '3',
			title: 'Client Call',
			start: at(2, 9),
			end: at(2, 10),
			location: 'Phone',
			color: '#8b5cf6',
			allDay: false
		},
		{
			id: '4',
			title: 'Full Day Event',
			start: new Date(new Date().setDate(new Date().getDate() + 3)),
			end: new Date(new Date().setDate(new Date().getDate() + 3)),
			location: 'Office',
			color: '#f59e0b',
			allDay: true
		}
	];
	const startDate = new Date();
	const endDate = new Date(new Date().setDate(new Date().getDate() + 6));
</script>

<TimeGrid {...args} events={sampleEvents} {startDate} {endDate} />
