<script lang="ts">
	import CalendarDay from '$stylist/calendar/component/atom/calendar-day/index.svelte';
	import type { RecipeCalendarGrid } from '$stylist/calendar/interface/recipe/calendar-grid';

	const DEFAULT_WEEKDAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

	let props: RecipeCalendarGrid = $props();
	const weekdayLabels = $derived(props.weekdayLabels ?? DEFAULT_WEEKDAY_LABELS);
</script>

<div class={['c-calendar-grid', props.class].filter(Boolean).join(' ')}>
	<div class="c-calendar-grid__weekdays">
		{#each weekdayLabels as label}
			<span class="c-calendar-grid__weekday">{label}</span>
		{/each}
	</div>
	<div class="c-calendar-grid__days">
		{#each props.days as day (day.date.toISOString())}
			<CalendarDay
				{...day}
				onSelect={props.onDaySelect}
				onHover={props.onDayHover}
				accentColor={props.accentColor}
			/>
		{/each}
	</div>
</div>

<style>
	.c-calendar-grid {
		display: grid;
		gap: 0.5rem;
		width: 100%;
	}

	.c-calendar-grid__weekdays,
	.c-calendar-grid__days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}

	.c-calendar-grid__weekdays {
		gap: 0.25rem;
	}

	.c-calendar-grid__days {
		gap: 0.125rem;
	}

	.c-calendar-grid__weekday {
		text-align: center;
		font-size: var(--text-size-xs, 0.75rem);
		color: var(--color-text-secondary);
	}
</style>
