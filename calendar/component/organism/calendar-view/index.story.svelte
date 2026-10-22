<script lang="ts">
	import CalendarView from '$stylist/calendar/component/organism/calendar-view/index.svelte';
	import type { RecipeCalendarView } from '$stylist/calendar/interface/recipe/calendar-view';
	import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';

	// Render of index.story.ts: the events and the initial date are Dates.
	let args: RecipeCalendarView = $props();

	const sampleEvents: SlotCalendarEvent[] = [
		{
			id: '1',
			title: 'Meeting',
			start: new Date(2023, 5, 15, 10, 0),
			end: new Date(2023, 5, 15, 11, 0)
		},
		{
			id: '2',
			title: 'Lunch',
			start: new Date(2023, 5, 16, 12, 30),
			end: new Date(2023, 5, 16, 13, 30)
		},
		{
			id: '3',
			title: 'Conference',
			start: new Date(2023, 5, 18, 9, 0),
			end: new Date(2023, 5, 20, 17, 0)
		}
	];
</script>

<CalendarView {...args} events={sampleEvents} initialDate={new Date(2023, 5, 15)} />
