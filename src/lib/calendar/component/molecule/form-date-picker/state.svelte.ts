import type { RecipeFormDatePicker } from '$stylist/calendar/interface/recipe/form-date-picker';
import {
	toInputDateString,
	fromInputDateString
} from '$stylist/calendar/function/script/calendar-utils';
import { formatDisplayDate } from '$stylist/calendar/function/script/date-format';

export const createFormDatePickerState = (getProps: () => RecipeFormDatePicker) => {
	const props = $derived(getProps());
	const toInputDate = (value: RecipeFormDatePicker['value']): string => {
		if (value instanceof Date) return toInputDateString(value);
		if (typeof value === 'string') return value;
		return '';
	};

	let selectedDate = $state(toInputDate(props.value));
	let showCalendar = $state(false);

	$effect(() => {
		selectedDate = toInputDate(props.value);
	});

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		selectedDate = target.value;
		const value = selectedDate ? fromInputDateString(selectedDate) : undefined;
		props.onChange?.(value, event);
		props.onValueChange?.(value, event);
		showCalendar = false;
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		selectedDate = target.value;
		const value = selectedDate ? fromInputDateString(selectedDate) : undefined;
		props.onInput?.(value, event);
		props.onValueInput?.(value, event);
	}

	function formatDate(dateString: string) {
		if (!dateString) return '';
		return formatDisplayDate(fromInputDateString(dateString));
	}

	function toggleCalendar() {
		showCalendar = !showCalendar;
	}

	function closeCalendar() {
		showCalendar = false;
	}

	const minDateStr = $derived(toInputDate(props.minDate));
	const maxDateStr = $derived(toInputDate(props.maxDate));

	return {
		get selectedDate() {
			return selectedDate;
		},
		get showCalendar() {
			return showCalendar;
		},
		get hostClass() {
			return props.class ?? '';
		},
		get inputClass() {
			return props.inputClass ?? '';
		},
		get calendarClass() {
			return props.calendarClass ?? '';
		},
		get label() {
			return props.label ?? 'Date';
		},
		get helperText() {
			return props.helperText;
		},
		get error() {
			return props.error;
		},
		get minDate() {
			return minDateStr;
		},
		get maxDate() {
			return maxDateStr;
		},
		get placeholder() {
			return props.placeholder ?? 'Select date';
		},
		handleInput,
		handleChange,
		formatDate,
		toggleCalendar,
		closeCalendar
	};
};

export default createFormDatePickerState;
