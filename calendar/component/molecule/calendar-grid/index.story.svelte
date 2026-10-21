<script lang="ts">
	import CalendarGrid from './index.svelte';
	import type { RecipeCalendarGrid } from '$stylist/calendar/interface/recipe/calendar-grid';
	import { generateCalendarDays } from '$stylist/calendar/function/script/generate-calendar-days';

	// Render of index.story.ts: the days are built from Dates by generateCalendarDays.
	let { weekStartsOn = 1, ...args }: Partial<RecipeCalendarGrid> & { weekStartsOn?: 0 | 1 } =
		$props();

	const days = $derived(
		generateCalendarDays({
			month: new Date(2026, 9, 1),
			weekStartsOn: Number(weekStartsOn) === 0 ? 0 : 1,
			selectedDate: new Date(2026, 9, 18)
		})
	);
	const weekdayLabels = $derived(
		Number(weekStartsOn) === 0 ? ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] : undefined
	);
</script>

<div class="_surface">
	<CalendarGrid {...args} {days} {weekdayLabels} />
</div>

<style>
	._surface {
		display: inline-grid;
		width: 320px;
		padding: 24px;
		background: var(--color-background-secondary, #f7f3ec);
	}
</style>
