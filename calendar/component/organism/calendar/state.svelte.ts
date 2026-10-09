import type { RecipeCalendar } from '$stylist/calendar/interface/recipe/calendar';
import { generateCalendarDays } from '$stylist/calendar/function/script/generate-calendar-days';

export function createCalendarState(getProps: () => RecipeCalendar) {
	const props = $derived(getProps());
	function firstOfMonth(date: Date): Date {
		return new Date(date.getFullYear(), date.getMonth(), 1);
	}
	let viewMonth = $state(firstOfMonth(new Date()));

	$effect(() => {
		viewMonth = firstOfMonth(props.value ?? props.initialMonth ?? new Date());
	});

	const weekStartsOn = $derived(props.weekStartsOn ?? 1);
	const monthLabel = $derived(
		viewMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
	);
	const days = $derived(
		generateCalendarDays({
			month: viewMonth,
			weekStartsOn,
			selectedDate: props.value ?? null,
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
		props.onChange?.(date);
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
		handleDaySelect
	};
}

export default createCalendarState;
