<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import CalendarGrid from './index.svelte';
	import { generateCalendarDays } from '$stylist/calendar/function/script/generate-calendar-days';

	const controls: SlotStory[] = [
		{ name: 'weekStartsOn', type: 'select', options: ['1', '0'], defaultValue: '1' },
		{ name: 'accentColor', type: 'color', defaultValue: '#3454d1' }
	];
</script>

<Story
	id="calendar-molecules-calendar-grid"
	title="Calendar / CalendarGrid"
	component={CalendarGrid}
	category="Calendar/Molecules"
	description="Сетка недель + шапка дней недели, рендерит CalendarDay по массиву SlotCalendarDay (готовит его generateCalendarDays). weekStartsOn=1 — неделя с понедельника (по умолчанию, под ru-RU), 0 — с воскресенья. accentColor задаёт цвет заливки today/selected/range."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_surface">
			<CalendarGrid
				days={generateCalendarDays({
					month: new Date(2026, 9, 1),
					weekStartsOn: Number(values.weekStartsOn) as 0 | 1,
					selectedDate: new Date(2026, 9, 18)
				})}
				weekdayLabels={Number(values.weekStartsOn) === 0
					? ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
					: undefined}
				accentColor={values.accentColor}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._surface {
		display: inline-grid;
		width: 320px;
		padding: 24px;
		background: var(--color-background-secondary, #f7f3ec);
	}
</style>
