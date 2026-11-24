<script lang="ts">
	/**
	 * Two dates in one line, styled alike: the start is picked in a calendar
	 * dropdown; the end is shown next to it and is disabled by default (the
	 * host computes it, e.g. start + tour length). For «Выезд/Заезд →
	 * Возвращение» in a booking calculator.
	 */
	import Calendar from '$stylist/calendar/component/organism/calendar/index.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeDatePairPicker } from '$stylist/calendar/interface/recipe/date-pair-picker';
	import createDatePairPickerComponentState from '$stylist/calendar/component/organism/date-pair-picker/state.svelte';

	let {
		value = '',
		endValue = '',
		startLabel = 'Начало',
		endLabel = 'Окончание',
		startTime = null,
		endTime = null,
		endPlaceholder = '',
		availableDates,
		endEditable = false,
		onChange,
		onEndChange
	}: RecipeDatePairPicker = $props();

	const state = createDatePairPickerComponentState(() => ({
		value: value,
		availableDates: availableDates
	}));
</script>

<div class="c-date-pair" bind:this={state.rootEl}>
	<button
		type="button"
		class="c-date-pair__box"
		data-open={state.openFor === 'start' || undefined}
		aria-haspopup="dialog"
		aria-expanded={state.openFor === 'start'}
		onclick={() => (state.openFor = state.openFor === 'start' ? null : 'start')}
	>
		<BaseIcon name="calendar" size={18} style="color: rgba(23, 35, 31, 0.5); flex-shrink: 0" />
		<span class="c-date-pair__text">
			<span class="c-date-pair__label">{startLabel}</span>
			<span class="c-date-pair__value" data-empty={!value || undefined}>
				{value ? [state.formatDay(value), startTime].filter(Boolean).join(', ') : 'Выберите дату'}
			</span>
		</span>
		<BaseIcon
			name="chevron-down"
			size={14}
			style={`color: rgba(23, 35, 31, 0.45); flex-shrink: 0; margin-left: auto; transition: transform 0.15s ease; transform: ${state.openFor === 'start' ? 'rotate(180deg)' : 'none'}`}
		/>
	</button>

	<span class="c-date-pair__arrow" aria-hidden="true">→</span>

	<svelte:element
		this={endEditable ? 'button' : 'div'}
		type={endEditable ? 'button' : undefined}
		class="c-date-pair__box"
		data-disabled={!endEditable || undefined}
		data-open={state.openFor === 'end' || undefined}
		aria-disabled={!endEditable}
		aria-expanded={endEditable ? state.openFor === 'end' : undefined}
		onclick={endEditable
			? () => (state.openFor = state.openFor === 'end' ? null : 'end')
			: undefined}
		role={endEditable ? undefined : 'group'}
	>
		<BaseIcon name="calendar" size={18} style="color: rgba(23, 35, 31, 0.35); flex-shrink: 0" />
		<span class="c-date-pair__text">
			<span class="c-date-pair__label">{endLabel}</span>
			<span class="c-date-pair__value" data-empty={!endValue || undefined}>
				{endValue
					? [state.formatDay(endValue), endTime].filter(Boolean).join(', ')
					: [endTime, endPlaceholder].filter(Boolean).join(' — ')}
			</span>
		</span>
	</svelte:element>

	{#if state.open}
		<div
			class="c-date-pair__panel"
			data-side={state.openFor}
			role="dialog"
			aria-label={state.openFor === 'end' ? endLabel : startLabel}
		>
			<Calendar
				value={state.toDate(state.openFor === 'end' ? endValue : value)}
				initialMonth={state.openFor === 'end'
					? (state.toDate(value) ?? undefined)
					: state.firstAvailable}
				isDateDisabled={state.openFor === 'end' ? state.isEndDisabled : state.isStartDisabled}
				onChange={(date) => {
					if (state.openFor === 'end') onEndChange?.(state.toIsoDate(date));
					else onChange?.(state.toIsoDate(date));
					state.openFor = null;
				}}
			/>
		</div>
	{/if}
</div>

<style>
	.c-date-pair {
		--color-text-primary: #17231f;
		--color-text-secondary: rgba(23, 35, 31, 0.5);
		--color-text-tertiary: rgba(23, 35, 31, 0.32);
		--color-text-inverse: white;
		--color-background-secondary: rgba(23, 35, 31, 0.06);
		--color-primary-500: #17231f;
		--color-border-primary: rgba(23, 35, 31, 0.28);
		--calendar-radius: 10px;
		--font-weight-medium: 650;
		position: relative;
		display: grid;
		/* Boxes as wide as their date (not stretched); the host places the pair. */
		grid-template-columns: minmax(0, max-content) auto minmax(0, max-content);
		justify-content: start;
		align-items: center;
		gap: 0.5rem;
	}

	/* Both boxes look the same; the end one is just inert. */
	.c-date-pair__box {
		display: flex;
		align-items: center;
		gap: 10px;
		min-width: 0;
		padding: 0.45rem 0.75rem;
		border: 1px solid rgba(23, 35, 31, 0.14);
		border-radius: 0.6rem;
		background: rgba(255, 255, 255, 0.9);
		font: inherit;
		color: #17231f;
		text-align: left;
	}

	button.c-date-pair__box {
		cursor: pointer;
	}

	button.c-date-pair__box:hover,
	.c-date-pair__box[data-open] {
		border-color: rgba(23, 35, 31, 0.35);
	}

	.c-date-pair__box[data-disabled] {
		background: rgba(23, 35, 31, 0.03);
		cursor: default;
	}

	.c-date-pair__text {
		display: grid;
		gap: 2px;
		min-width: 0;
	}

	.c-date-pair__label {
		font-size: 0.76rem;
		color: rgba(23, 35, 31, 0.62);
	}

	/* Wraps instead of cutting the date off with «…» when the box is narrow. */
	.c-date-pair__value {
		font-weight: 650;
		overflow-wrap: anywhere;
	}

	.c-date-pair__value[data-empty] {
		font-weight: 500;
		color: rgba(23, 35, 31, 0.55);
	}

	.c-date-pair__box[data-disabled] .c-date-pair__value {
		color: rgba(23, 35, 31, 0.7);
	}

	.c-date-pair__arrow {
		color: rgba(23, 35, 31, 0.4);
	}

	.c-date-pair__panel {
		position: absolute;
		top: calc(100% + 6px);
		left: 0;
		z-index: 30;
		width: min(300px, calc(100vw - 32px));
		padding: 12px;
		border-radius: 14px;
		background: white;
		box-shadow: 0 18px 50px rgba(20, 36, 31, 0.18);
		box-sizing: border-box;
	}

	.c-date-pair__panel[data-side='end'] {
		left: auto;
		right: 0;
	}

	@media (max-width: 480px) {
		.c-date-pair {
			grid-template-columns: minmax(0, 1fr);
			justify-content: stretch;
		}

		.c-date-pair__arrow {
			display: none;
		}
	}
</style>
