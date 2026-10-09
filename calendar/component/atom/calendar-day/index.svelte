<script lang="ts">
	import type { RecipeCalendarDay } from '$stylist/calendar/interface/recipe/calendar-day';

	let props: RecipeCalendarDay = $props();

	function handleClick(): void {
		if (props.isDisabled) return;
		props.onSelect?.(props.date);
	}
</script>

<button
	type="button"
	class={['c-calendar-day', props.class].filter(Boolean).join(' ')}
	style:--calendar-day-accent={props.accentColor}
	data-current-month={props.isCurrentMonth || undefined}
	data-today={props.isToday || undefined}
	data-selected={props.isSelected || undefined}
	data-disabled={props.isDisabled || undefined}
	data-range-start={props.isRangeStart || undefined}
	data-range-end={props.isRangeEnd || undefined}
	data-in-range={props.isInRange || undefined}
	disabled={props.isDisabled}
	aria-current={props.isToday ? 'date' : undefined}
	aria-pressed={props.isSelected || props.isRangeStart || props.isRangeEnd || undefined}
	aria-label={props.date.toISOString().split('T')[0]}
	onclick={handleClick}
	onmouseenter={() => props.onHover?.(props.date)}
>
	<span class="c-calendar-day__number">{props.date.getDate()}</span>
</button>

<style>
	.c-calendar-day {
		position: relative;
		aspect-ratio: 1 / 1;
		display: grid;
		place-items: center;
		width: 100%;
		border: 0;
		border-radius: var(--border-radius-base, 0.375rem);
		background: transparent;
		font: inherit;
		font-weight: var(--font-weight-medium, 500);
		color: var(--color-text-primary);
		cursor: pointer;
	}

	.c-calendar-day:hover:not(:disabled) {
		background: var(--color-background-secondary);
	}

	.c-calendar-day:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--calendar-day-accent, var(--color-primary-500));
	}

	.c-calendar-day[data-current-month='false'],
	.c-calendar-day:not([data-current-month]) {
		color: var(--color-text-tertiary, var(--color-text-secondary));
	}

	/* isToday — залитый круг, отдельный от «выбрано» акцент. */
	.c-calendar-day[data-today] {
		border-radius: 999px;
		background: color-mix(
			in srgb,
			var(--calendar-day-accent, var(--color-primary-500)) 18%,
			transparent
		);
	}

	.c-calendar-day[data-in-range] {
		border-radius: 0;
		background: color-mix(
			in srgb,
			var(--calendar-day-accent, var(--color-primary-500)) 12%,
			transparent
		);
	}

	.c-calendar-day[data-range-start],
	.c-calendar-day[data-range-end] {
		background: var(--calendar-day-accent, var(--color-primary-500));
		color: var(--color-text-inverse, white);
	}

	.c-calendar-day[data-range-start] {
		border-start-start-radius: var(--border-radius-base, 0.375rem);
		border-end-start-radius: var(--border-radius-base, 0.375rem);
	}

	.c-calendar-day[data-range-end] {
		border-start-end-radius: var(--border-radius-base, 0.375rem);
		border-end-end-radius: var(--border-radius-base, 0.375rem);
	}

	.c-calendar-day[data-selected] {
		background: var(--calendar-day-accent, var(--color-primary-500));
		color: var(--color-text-inverse, white);
	}

	/* isDisabled — не просто затемнение, а перечёркнутая дата. */
	.c-calendar-day:disabled {
		color: var(--color-text-tertiary, var(--color-text-secondary));
		opacity: var(--opacity-45, 0.45);
		cursor: not-allowed;
	}

	.c-calendar-day:disabled .c-calendar-day__number {
		text-decoration: line-through;
		text-decoration-thickness: 1.5px;
	}

	.c-calendar-day__number {
		display: block;
		line-height: 1;
	}
</style>
