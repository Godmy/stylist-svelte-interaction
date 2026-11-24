import type { RecipeCalendar } from '$stylist/calendar/interface/recipe/calendar';
import { generateCalendarDays } from '$stylist/calendar/function/script/generate-calendar-days';
import { navigateMonth as shiftMonth } from '$stylist/calendar/function/script/calendar-utils';
import { addDays } from '$stylist/calendar/function/script/date/add-days';
import { now } from '$stylist/calendar/function/script/date/now';

export function createCalendarState(getProps: () => RecipeCalendar) {
	const props = $derived(getProps());
	const firstOfMonth = (date: Date): Date => shiftMonth(date, 0);
	let viewMonth = $derived(firstOfMonth(props.value ?? props.initialMonth ?? now()));

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

	const canGoPrev = $derived(!props.minDate || addDays(viewMonth, -1) >= props.minDate);
	const canGoNext = $derived(!props.maxDate || shiftMonth(viewMonth, 1) <= props.maxDate);

	function navigateMonth(offset: number): void {
		viewMonth = shiftMonth(viewMonth, offset);
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
