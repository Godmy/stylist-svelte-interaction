<script lang="ts">
	import TimeGrid from '$stylist/calendar/component/organism/time-grid/index.svelte';
	import type { RecipeTimeGrid } from '$stylist/calendar/interface/recipe/time-grid';
	import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';
	import { addDays } from '$stylist/calendar/function/script/date/add-days';
	import { now } from '$stylist/calendar/function/script/date/now';
	import { withTime } from '$stylist/calendar/function/script/date/with-time';

	// Render of index.story.ts: the visible week and the events are Dates relative to today.
	let args: RecipeTimeGrid = $props();

	function at(dayOffset: number, hours: number, minutes = 0): Date {
		return withTime(addDays(now(), dayOffset), hours, minutes);
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
			start: addDays(now(), 3),
			end: addDays(now(), 3),
			location: 'Office',
			color: '#f59e0b',
			allDay: true
		}
	];
	const startDate = now();
	const endDate = addDays(now(), 6);
</script>

<TimeGrid {...args} events={sampleEvents} {startDate} {endDate} />
