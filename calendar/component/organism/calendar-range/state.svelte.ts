import { untrack } from 'svelte';
import type { RecipeCalendarRange } from '$stylist/calendar/interface/recipe/calendar-range';
import { generateCalendarDays } from '$stylist/calendar/function/script/generate-calendar-days';
import { navigateMonth as shiftMonth } from '$stylist/calendar/function/script/calendar-utils';
import { addDays } from '$stylist/calendar/function/script/date/add-days';
import { now } from '$stylist/calendar/function/script/date/now';

export function createCalendarRangeState(getProps: () => RecipeCalendarRange) {
	const props = $derived(getProps());
	const firstOfMonth = (date: Date): Date => shiftMonth(date, 0);

	let viewMonth = $state(
		untrack(() => firstOfMonth(props.initialMonth ?? props.startDate ?? now()))
	);
	let hoveredDate = $state<Date | null>(null);

	$effect(() => {
		if (props.startDate) {
			viewMonth = firstOfMonth(props.startDate);
		}
	});

	const weekStartsOn = $derived(props.weekStartsOn ?? 1);
	const monthLabel = $derived(
		viewMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
	);

	const previewEnd = $derived.by(() => {
		if (props.endDate) return props.endDate;
		if (props.startDate && hoveredDate && hoveredDate > props.startDate) return hoveredDate;
		return null;
	});

	const days = $derived(
		generateCalendarDays({
			month: viewMonth,
			weekStartsOn,
			rangeStart: props.startDate ?? null,
			rangeEnd: previewEnd,
			minDate: props.minDate,
			maxDate: props.maxDate,
			isDateDisabled: props.isDateDisabled
		})
	);

	const canGoPrev = $derived(!props.minDate || addDays(viewMonth, -1) >= props.minDate);
	const canGoNext = $derived(!props.maxDate || shiftMonth(viewMonth, 1) <= props.maxDate);

	function navigateMonth(offset: number): void {
		viewMonth = shiftMonth(viewMonth, offset);
	}

	function handleDaySelect(date: Date): void {
		const { startDate, endDate } = props;
		if (!startDate || endDate) {
			props.onChange?.({ start: date, end: null });
			return;
		}
		if (date < startDate) {
			props.onChange?.({ start: date, end: null });
			return;
		}
		props.onChange?.({ start: startDate, end: date });
	}

	function handleDayHover(date: Date): void {
		hoveredDate = date;
	}

	return {
		get monthLabel() {
			return monthLabel;
		},
		get days() {
			return days;
		},
		get weekdayLabels() {
			return props.weekdayLabels;
		},
		get accentColor() {
			return props.accentColor;
		},
		get canGoPrev() {
			return canGoPrev;
		},
		get canGoNext() {
			return canGoNext;
		},
		navigateMonth,
		handleDaySelect,
		handleDayHover
	};
}

export default createCalendarRangeState;
