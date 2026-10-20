<script lang="ts">
	import CalendarRange from './index.svelte';
	import type { RecipeCalendarRange } from '$stylist/calendar/interface/recipe/calendar-range';

	// Render of index.story.ts: the selected Date range lives in local state shown above the calendar.
	let { disablePast = false, ...args }: RecipeCalendarRange & { disablePast?: boolean } = $props();

	let range = $state<{ start: Date | null; end: Date | null }>({
		start: new Date(2026, 9, 18),
		end: new Date(2026, 9, 22)
	});

	const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

	function formatRange(value: { start: Date | null; end: Date | null }): string {
		const fmt = (date: Date) =>
			date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
		if (!value.start) return 'Не выбрано';
		if (!value.end) return `${fmt(value.start)} → выберите конец периода`;
		return `${fmt(value.start)} → ${fmt(value.end)}`;
	}
</script>

<div class="_surface">
	<p class="_range-label">{formatRange(range)}</p>
	<CalendarRange
		{...args}
		startDate={range.start}
		endDate={range.end}
		onChange={(next) => (range = next)}
		minDate={disablePast ? today : undefined}
	/>
</div>

<style>
	._surface {
		display: grid;
		gap: 12px;
		width: 320px;
		padding: 24px;
		background: var(--color-background-secondary, #f7f3ec);
	}
	._range-label {
		margin: 0;
		font-weight: 600;
		color: var(--color-text-primary);
	}
</style>
