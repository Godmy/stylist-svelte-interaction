import type { RecipeCalendarRange } from '$stylist/calendar/interface/recipe/calendar-range';
import { generateCalendarDays } from '$stylist/calendar/function/script/generate-calendar-days';

export function createCalendarRangeState(getProps: () => RecipeCalendarRange) {
	const props = $derived(getProps());
	function firstOfMonth(date: Date): Date {
		return new Date(date.getFullYear(), date.getMonth(), 1);
	}

	let viewMonth = $state(firstOfMonth(props.initialMonth ?? props.startDate ?? new Date()));
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

	const canGoPrev = $derived(
		!props.minDate || new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 0) >= props.minDate
	);
	const canGoNext = $derived(
		!props.maxDate ||
			new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1) <= props.maxDate
	);

	function navigateMonth(offset: number): void {
		viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + offset, 1);
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
