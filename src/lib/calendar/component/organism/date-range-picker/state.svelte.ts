import type { RecipeDateRangePicker } from '$stylist/calendar/interface/recipe/date-range-picker';
import { generateCalendarGrid } from '$stylist/calendar/function/script/calendar-utils';
import { formatDisplayDate } from '$stylist/calendar/function/script/date-format';

export const createDateRangePickerState = (getProps: () => RecipeDateRangePicker) => {
	const props = $derived(getProps());
	const isRangeValue = (
		value: RecipeDateRangePicker['value']
	): value is { start: Date | null; end: Date | null } => {
		return (
			!!value &&
			typeof value === 'object' &&
			!(value instanceof Date) &&
			'start' in value &&
			'end' in value
		);
	};

	const parseRange = (value: RecipeDateRangePicker['value']) => ({
		start: isRangeValue(value) && value.start ? new Date(value.start) : null,
		end: isRangeValue(value) && value.end ? new Date(value.end) : null
	});

	let selectedRange = $state(parseRange(props.value));
	let isOpen = $state(false);
	let currentDateView = $state(new Date());

	$effect(() => {
		selectedRange = parseRange(props.value);
	});

	function fmt(date: Date | null) {
		return date ? formatDisplayDate(date) : '';
	}

	function pick(date: Date) {
		if (props.disabled) return;
		if (!selectedRange.start || selectedRange.end) {
			selectedRange = { start: date, end: null };
		} else if (date >= selectedRange.start) {
			selectedRange = { ...selectedRange, end: date };
			props.onChange?.(selectedRange);
			isOpen = false;
		} else {
			selectedRange = { start: date, end: null };
		}
	}

	function inRange(date: Date) {
		if (!selectedRange.start || !selectedRange.end) return false;
		return date > selectedRange.start && date < selectedRange.end;
	}

	function isRangeEnd(date: Date) {
		return (
			(!!selectedRange.start && date.toDateString() === selectedRange.start.toDateString()) ||
			(!!selectedRange.end && date.toDateString() === selectedRange.end.toDateString())
		);
	}

	function toggleOpen() {
		if (!props.disabled) isOpen = !isOpen;
	}

	function clear() {
		selectedRange = { start: null, end: null };
		props.onChange?.(selectedRange);
	}

	function applySelection() {
		if (selectedRange.start && selectedRange.end) {
			props.onChange?.(selectedRange);
		}
		isOpen = false;
	}

	function previousMonth() {
		currentDateView = new Date(currentDateView.getFullYear(), currentDateView.getMonth() - 1, 1);
	}

	function nextMonth() {
		currentDateView = new Date(currentDateView.getFullYear(), currentDateView.getMonth() + 1, 1);
	}

	const calendarDates = $derived(generateCalendarGrid(currentDateView));

	const displayValue = $derived(
		selectedRange.start
			? selectedRange.end
				? `${fmt(selectedRange.start)} — ${fmt(selectedRange.end)}`
				: fmt(selectedRange.start)
			: (props.placeholder ?? 'Select date range')
	);

	return {
		get selectedRange() {
			return selectedRange;
		},
		set selectedRange(value: { start: Date | null; end: Date | null }) {
			selectedRange = value;
		},
		get isOpen() {
			return isOpen;
		},
		set isOpen(value: boolean) {
			isOpen = value;
		},
		get currentDateView() {
			return currentDateView;
		},
		get disabled() {
			return props.disabled ?? false;
		},
		get className() {
			return props.class ?? '';
		},
		get calendarClass() {
			return props.calendarClass ?? '';
		},
		get inputClass() {
			return props.inputClass ?? '';
		},
		get buttonClass() {
			return props.buttonClass ?? '';
		},
		get calendarDates() {
			return calendarDates;
		},
		get displayValue() {
			return displayValue;
		},
		fmt,
		pick,
		inRange,
		isRangeEnd,
		toggleOpen,
		clear,
		applySelection,
		previousMonth,
		nextMonth
	};
};

export default createDateRangePickerState;
