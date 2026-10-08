<script lang="ts">
	import Calendar from '$stylist/calendar/component/organism/calendar/index.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';

	/**
	 * Two dates in one line, styled alike: the start is picked in a calendar
	 * dropdown; the end is shown next to it and is disabled by default (the
	 * host computes it, e.g. start + tour length). For «Выезд/Заезд →
	 * Возвращение» in a booking calculator.
	 */
	type Props = {
		/** Start date, ISO `yyyy-mm-dd`, or '' when not chosen. */
		value?: string;
		/** End date, ISO — computed by the host. */
		endValue?: string;
		startLabel?: string;
		endLabel?: string;
		/** Time shown after the date, e.g. «04:00». */
		startTime?: string | null;
		endTime?: string | null;
		/** What the end box says while there is no start date, e.g. «2-й день». */
		endPlaceholder?: string;
		/** Only these ISO dates can be picked; absent — any day from today. */
		availableDates?: string[];
		/** The end box is a picker too (off by default: the host computes the end). Its dates start at the start date. */
		endEditable?: boolean;
		onChange?: (value: string) => void;
		onEndChange?: (value: string) => void;
	};

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
	}: Props = $props();

	let openFor = $state<'start' | 'end' | null>(null);
	const open = $derived(openFor !== null);
	let rootEl = $state<HTMLDivElement>();

	function toIsoDate(date: Date): string {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
	}

	// One line in the box: the year only when it isn't the current one.
	function formatDay(iso: string): string {
		const date = new Date(`${iso}T00:00:00`);
		return date.toLocaleDateString('ru-RU', {
			weekday: 'short',
			day: 'numeric',
			month: 'long',
			...(date.getFullYear() !== new Date().getFullYear() ? { year: 'numeric' } : {})
		});
	}

	const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
	const available = $derived(availableDates ? new Set(availableDates) : null);
	const toDate = (iso: string) => (iso ? new Date(`${iso}T00:00:00`) : null);
	const firstAvailable = $derived(availableDates?.[0] ? new Date(`${availableDates[0]}T00:00:00`) : undefined);

	function isStartDisabled(date: Date): boolean {
		if (date < today) return true;
		return available ? !available.has(toIsoDate(date)) : false;
	}

	function isEndDisabled(date: Date): boolean {
		const start = toDate(value);
		return date < (start ?? today);
	}

	$effect(() => {
		if (!open) return;
		const onPointer = (event: PointerEvent) => {
			if (rootEl && event.target instanceof Node && !rootEl.contains(event.target)) openFor = null;
		};
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') openFor = null;
		};
		document.addEventListener('pointerdown', onPointer);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('pointerdown', onPointer);
			document.removeEventListener('keydown', onKey);
		};
	});
</script>

<div class="c-date-pair" bind:this={rootEl}>
	<button
		type="button"
		class="c-date-pair__box"
		data-open={openFor === 'start' || undefined}
		aria-haspopup="dialog"
		aria-expanded={openFor === 'start'}
		onclick={() => (openFor = openFor === 'start' ? null : 'start')}
	>
		<BaseIcon name="calendar" size={18} style="color: rgba(23, 35, 31, 0.5); flex-shrink: 0" />
		<span class="c-date-pair__text">
			<span class="c-date-pair__label">{startLabel}</span>
			<span class="c-date-pair__value" data-empty={!value || undefined}>
				{value ? [formatDay(value), startTime].filter(Boolean).join(', ') : 'Выберите дату'}
			</span>
		</span>
		<BaseIcon
			name="chevron-down"
			size={14}
			style={`color: rgba(23, 35, 31, 0.45); flex-shrink: 0; margin-left: auto; transition: transform 0.15s ease; transform: ${openFor === 'start' ? 'rotate(180deg)' : 'none'}`}
		/>
	</button>

	<span class="c-date-pair__arrow" aria-hidden="true">→</span>

	<svelte:element
		this={endEditable ? 'button' : 'div'}
		type={endEditable ? 'button' : undefined}
		class="c-date-pair__box"
		data-disabled={!endEditable || undefined}
		data-open={openFor === 'end' || undefined}
		aria-disabled={!endEditable}
		aria-expanded={endEditable ? openFor === 'end' : undefined}
		onclick={endEditable ? () => (openFor = openFor === 'end' ? null : 'end') : undefined}
		role={endEditable ? undefined : 'group'}
	>
		<BaseIcon name="calendar" size={18} style="color: rgba(23, 35, 31, 0.35); flex-shrink: 0" />
		<span class="c-date-pair__text">
			<span class="c-date-pair__label">{endLabel}</span>
			<span class="c-date-pair__value" data-empty={!endValue || undefined}>
				{endValue ? [formatDay(endValue), endTime].filter(Boolean).join(', ') : [endTime, endPlaceholder].filter(Boolean).join(' — ')}
			</span>
		</span>
	</svelte:element>

	{#if open}
		<div
			class="c-date-pair__panel"
			data-side={openFor}
			role="dialog"
			aria-label={openFor === 'end' ? endLabel : startLabel}
		>
			<Calendar
				value={toDate(openFor === 'end' ? endValue : value)}
				initialMonth={openFor === 'end' ? (toDate(value) ?? undefined) : firstAvailable}
				isDateDisabled={openFor === 'end' ? isEndDisabled : isStartDisabled}
				onChange={(date) => {
					if (openFor === 'end') onEndChange?.(toIsoDate(date));
					else onChange?.(toIsoDate(date));
					openFor = null;
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
		--border-radius-base: 10px;
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
