<script lang="ts">
	import type { RecipeMonthRangePicker } from '$stylist/calendar/interface/recipe/month-range-picker';

	let {
		from,
		to,
		onChange,
		locale = 'ru-RU',
		label = 'Period',
		previousLabel = 'Previous month',
		nextLabel = 'Next month',
		fromLabel = 'From',
		toLabel = 'To',
		applyLabel = 'Apply',
		class: className = ''
	}: RecipeMonthRangePicker = $props();

	let open = $state(false);

	const utc = (day: string) => new Date(`${day.slice(0, 10)}T00:00:00Z`);
	const iso = (date: Date) => date.toISOString().slice(0, 10);
	const monthEnd = (day: string) => {
		const date = utc(`${day.slice(0, 7)}-01`);
		date.setUTCMonth(date.getUTCMonth() + 1, 0);
		return iso(date);
	};
	const short = (day: string) => utc(day).toLocaleDateString(locale, { timeZone: 'UTC' });
	const wholeMonth = $derived(from.slice(8, 10) === '01' && to === monthEnd(from));
	const summary = $derived(
		wholeMonth
			? new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
					utc(from)
				)
			: `${short(from)} – ${short(to)}`
	);

	function shift(delta: number) {
		const date = utc(`${from.slice(0, 7)}-01`);
		date.setUTCMonth(date.getUTCMonth() + delta);
		const start = iso(date);
		open = false;
		onChange?.({ from: start, to: monthEnd(start) });
	}

	function apply(event: SubmitEvent) {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		const start = String(data.get('from') ?? '');
		const end = String(data.get('to') ?? '');
		if (!start || !end) return;
		open = false;
		onChange?.(end < start ? { from: end, to: start } : { from: start, to: end });
	}
</script>

<div class="c-month-range-picker {className}" role="group" aria-label={label}>
	<button
		type="button"
		class="c-month-range-picker__step"
		aria-label={previousLabel}
		onclick={() => shift(-1)}>‹</button
	>
	<button
		type="button"
		class="c-month-range-picker__summary"
		aria-expanded={open}
		onclick={() => (open = !open)}>{summary}</button
	>
	<button
		type="button"
		class="c-month-range-picker__step"
		aria-label={nextLabel}
		onclick={() => shift(1)}>›</button
	>
	{#if open}
		<form class="c-month-range-picker__range" onsubmit={apply}>
			<label>
				{fromLabel}
				<input type="date" name="from" value={from} required />
			</label>
			<label>
				{toLabel}
				<input type="date" name="to" value={to} required />
			</label>
			<button type="submit">{applyLabel}</button>
		</form>
	{/if}
</div>

<style>
	.c-month-range-picker {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem;
	}
	.c-month-range-picker button {
		min-height: 2.75rem;
		border: 0;
		border-radius: 0.5rem;
		font: inherit;
		cursor: pointer;
	}
	.c-month-range-picker__step {
		min-width: 2.75rem;
		background: var(--color-primary-700, #155b5a);
		color: var(--color-text-inverse, #fff);
		font-size: 1.25rem;
		line-height: 1;
	}
	.c-month-range-picker__summary {
		flex: 1 1 auto;
		padding: 0 1rem;
		background: var(--color-background-secondary, #f4efe6);
		color: var(--color-text-primary, #17140f);
		font-weight: 600;
		white-space: nowrap;
	}
	.c-month-range-picker__range {
		position: absolute;
		top: calc(100% + 0.25rem);
		right: 0;
		z-index: 5;
		display: flex;
		gap: 0.5rem;
		align-items: end;
		padding: 0.75rem;
		border: 1px solid var(--color-border-primary, rgb(35 32 29 / 0.12));
		border-radius: 0.875rem;
		background: var(--color-background-primary, #fff);
		box-shadow: 0 4px 16px rgb(0 0 0 / 0.12);
	}
	.c-month-range-picker__range label {
		display: grid;
		gap: 0.2rem;
		font-size: 0.875rem;
	}
	.c-month-range-picker__range input {
		min-height: 2.75rem;
		padding: 0 0.6rem;
		border: 1px solid var(--color-border-primary, rgb(35 32 29 / 0.12));
		border-radius: 0.5rem;
		background: var(--color-background-primary, #fff);
		color: var(--color-text-primary, #17140f);
		font: inherit;
	}
	.c-month-range-picker__range button {
		padding: 0 1rem;
		background: var(--color-primary-600, #147270);
		color: var(--color-text-inverse, #fff);
		font-weight: 600;
	}
	@media (max-width: 30rem) {
		.c-month-range-picker__range {
			position: static;
			flex: 1 1 100%;
			flex-wrap: wrap;
		}
		.c-month-range-picker__range label {
			flex: 1 1 8rem;
		}
		.c-month-range-picker__range button {
			flex: 1 1 100%;
		}
	}
</style>
