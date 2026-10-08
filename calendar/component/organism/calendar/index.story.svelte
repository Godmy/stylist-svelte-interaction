<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Calendar from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'value', type: 'text', defaultValue: '2026-10-18' },
		{ name: 'disablePast', type: 'boolean', defaultValue: true },
		{ name: 'accentColor', type: 'color', defaultValue: '#3454d1' }
	];

	const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
</script>

<Story
	id="calendar-organisms-calendar"
	title="Calendar / Calendar"
	component={Calendar}
	category="Calendar/Organisms"
	description="Полноценный однодневный выбор даты: навигация по месяцам, неделя с понедельника (ru-RU). `disablePast` включает minDate=сегодня — прошлые даты перечёркнуты и недоступны, а кнопка «предыдущий месяц» гаснет, как только уходить назад больше некуда. accentColor — цвет заливки today/selected."
	{controls}
>
	{#snippet children(values: any)}
		{@const parsed = values.value ? new Date(`${values.value}T00:00:00`) : null}
		<div class="_surface">
			<Calendar
				value={parsed && !Number.isNaN(parsed.getTime()) ? parsed : null}
				minDate={values.disablePast ? today : undefined}
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
