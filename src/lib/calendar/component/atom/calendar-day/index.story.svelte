<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import CalendarDay from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'isCurrentMonth', type: 'boolean', defaultValue: true },
		{ name: 'isToday', type: 'boolean', defaultValue: false },
		{ name: 'isSelected', type: 'boolean', defaultValue: false },
		{ name: 'isDisabled', type: 'boolean', defaultValue: false },
		{ name: 'isRangeStart', type: 'boolean', defaultValue: false },
		{ name: 'isRangeEnd', type: 'boolean', defaultValue: false },
		{ name: 'isInRange', type: 'boolean', defaultValue: false },
		{ name: 'accentColor', type: 'color', defaultValue: '#3454d1' }
	];
</script>

<Story
	id="calendar-atoms-calendar-day"
	title="Calendar / CalendarDay"
	component={CalendarDay}
	category="Calendar/Atoms"
	description="Одна ячейка дня — общий атом для CalendarGrid/Calendar/CalendarRange. today — залитый круг, disabled — перечёркнутая дата (не просто затемнение), selected/range — заливка акцентным цветом. accentColor меняет цвет заливки (по умолчанию — токен темы --color-primary-500)."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_surface">
			<CalendarDay
				date={new Date(2026, 9, 18)}
				events={[]}
				isCurrentMonth={Boolean(values.isCurrentMonth)}
				isToday={Boolean(values.isToday)}
				isSelected={Boolean(values.isSelected)}
				isDisabled={Boolean(values.isDisabled)}
				isRangeStart={Boolean(values.isRangeStart)}
				isRangeEnd={Boolean(values.isRangeEnd)}
				isInRange={Boolean(values.isInRange)}
				accentColor={values.accentColor}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._surface {
		display: inline-grid;
		width: 64px;
		padding: 24px;
		background: var(--color-background-secondary, #f7f3ec);
	}
</style>
