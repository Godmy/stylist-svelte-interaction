<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import CalendarRange from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'disablePast', type: 'boolean', defaultValue: true },
		{ name: 'accentColor', type: 'color', defaultValue: '#3454d1' }
	];

	let range = $state<{ start: Date | null; end: Date | null }>({
		start: new Date(2026, 9, 18),
		end: new Date(2026, 9, 22)
	});

	const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

	function formatRange(value: { start: Date | null; end: Date | null }): string {
		const fmt = (date: Date) => date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
		if (!value.start) return 'Не выбрано';
		if (!value.end) return `${fmt(value.start)} → выберите конец периода`;
		return `${fmt(value.start)} → ${fmt(value.end)}`;
	}
</script>

<Story
	id="calendar-organisms-calendar-range"
	title="Calendar / CalendarRange"
	component={CalendarRange}
	category="Calendar/Organisms"
	description="Выбор периода: первый клик — начало, второй — конец (клик раньше начала перезапускает выбор с новой даты). Наведение курсора между кликами показывает предпросмотр периода. `disablePast` включает minDate=сегодня, accentColor — цвет заливки today/периода."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_surface">
			<p class="_range-label">{formatRange(range)}</p>
			<CalendarRange
				startDate={range.start}
				endDate={range.end}
				onChange={(next) => (range = next)}
				minDate={values.disablePast ? today : undefined}
				accentColor={values.accentColor}
			/>
		</div>
	{/snippet}
</Story>

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
