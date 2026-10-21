<script lang="ts">
	import MiniCalendar from './index.svelte';
	import type { RecipeMiniCalendar } from '$stylist/calendar/interface/recipe/mini-calendar';
	import type { SlotCalendarEvent } from '$stylist/calendar/interface/slot/calendar-event';

	// Render of index.story.ts: the events and the initial date are Dates of the current month.
	let { withEvents = true, ...args }: RecipeMiniCalendar & { withEvents?: boolean } = $props();

	const year = new Date().getFullYear();
	const month = new Date().getMonth();
	const sampleEvents: SlotCalendarEvent[] = [
		{
			id: '1',
			title: 'Meeting',
			start: new Date(year, month, 10, 10, 0),
			end: new Date(year, month, 10, 11, 0),
			color: '#3b82f6'
		},
		{
			id: '2',
			title: 'Lunch',
			start: new Date(year, month, 15, 12, 0),
			end: new Date(year, month, 15, 13, 0),
			color: '#10b981'
		},
		{
			id: '3',
			title: 'Deadline',
			start: new Date(year, month, 20, 17, 0),
			end: new Date(year, month, 20, 18, 0),
			color: '#ef4444'
		},
		{
			id: '4',
			title: 'Conference',
			start: new Date(year, month, 25, 14, 0),
			end: new Date(year, month, 25, 15, 30),
			color: '#8b5cf6'
		}
	];
</script>

<MiniCalendar {...args} events={withEvents ? sampleEvents : []} initialDate={new Date()} />
