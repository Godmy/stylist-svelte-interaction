import type { RecipeDateTimeRangePicker } from '$stylist/calendar/interface/recipe/date-time-range-picker';

export const createDateTimeRangePickerState = (getProps: () => RecipeDateTimeRangePicker) => {
	const props = $derived(getProps());
	const isRangeValue = (
		value: RecipeDateTimeRangePicker['value']
	): value is { start: Date | null; end: Date | null } => {
		return (
			!!value &&
			typeof value === 'object' &&
			!(value instanceof Date) &&
			'start' in value &&
			'end' in value
		);
	};

	const parseRange = (value: RecipeDateTimeRangePicker['value']) => ({
		start: isRangeValue(value) && value.start ? new Date(value.start) : null,
		end: isRangeValue(value) && value.end ? new Date(value.end) : null
	});

	let selectedRange = $state(parseRange(props.value));
	let isOpen = $state(false);
	let validationError = $state('');

	function fmt(date: Date | null) {
		return date ? date.toLocaleString() : '';
	}

	function changeDate(kind: 'start' | 'end', dateValue: string) {
		const existing = selectedRange[kind];
		const base = dateValue ? new Date(dateValue) : new Date();
		if (existing) {
			base.setHours(existing.getHours(), existing.getMinutes(), 0, 0);
		}
		selectedRange = { ...selectedRange, [kind]: base };
		validationError = '';
	}

	function changeTimePart(kind: 'start' | 'end', hh: number, mm: number) {
		const existing = selectedRange[kind];
		if (!existing) return;
		const base = new Date(existing);
		base.setHours(hh, mm, 0, 0);
		selectedRange = { ...selectedRange, [kind]: base };
		validationError = '';
	}

	function commit() {
		const { start, end } = selectedRange;
		if (!start || !end) {
			validationError = 'Select both start and end';
			return;
		}
		if (start > end) {
			validationError = 'Start must be before end';
			return;
		}
		props.onChange?.(selectedRange);
		isOpen = false;
		validationError = '';
	}

	function cancel() {
		selectedRange = parseRange(props.value);
		isOpen = false;
		validationError = '';
	}

	function toggleOpen() {
		if (!props.disabled) isOpen = !isOpen;
	}

	function clear() {
		selectedRange = { start: null, end: null };
		props.onChange?.(selectedRange);
	}

	const toDateInput = (date: Date | null) => (date ? date.toISOString().split('T')[0] : '');
	const toTimeInput = (date: Date | null) => {
		if (!date) return '';
		return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
	};

	return {
		get selectedRange() {
			return selectedRange;
		},
		get isOpen() {
			return isOpen;
		},
		get disabled() {
			return props.disabled ?? false;
		},
		get placeholder() {
			return props.placeholder ?? 'Select date and time range';
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
		get validationError() {
			return validationError;
		},
		fmt,
		changeDate,
		changeTimePart,
		commit,
		cancel,
		toggleOpen,
		clear,
		toDateInput,
		toTimeInput
	};
};

export default createDateTimeRangePickerState;
