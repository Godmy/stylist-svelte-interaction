<script lang="ts">
	import CalendarDay from './index.svelte';
	import type { RecipeCalendarDay } from '$stylist/calendar/interface/recipe/calendar-day';

	// Render of index.story.ts: the day cell needs a Date, which story args do not carry.
	let { isCurrentMonth = true, isToday = false, ...args }: Partial<RecipeCalendarDay> = $props();
</script>

<div class="_surface">
	<CalendarDay {...args} {isCurrentMonth} {isToday} date={new Date(2026, 9, 18)} events={[]} />
</div>

<style>
	._surface {
		display: inline-grid;
		width: 64px;
		padding: 24px;
		background: var(--color-background-secondary, #f7f3ec);
	}
</style>
