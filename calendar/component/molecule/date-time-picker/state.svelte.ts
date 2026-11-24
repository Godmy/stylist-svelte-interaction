import { untrack } from 'svelte';
import type { RecipeDateTimePicker } from '$stylist/calendar/interface/recipe/date-time-picker';
import type { DatePickerValue } from '$stylist/calendar/interface/slot/date-picker';
import { fromInputDateString } from '$stylist/calendar/function/script/calendar-utils';
import { fromInputDateTime } from '$stylist/calendar/function/script/date/from-input-date-time';
import { now } from '$stylist/calendar/function/script/date/now';
import { toDate as cloneDate } from '$stylist/calendar/function/script/date/to-date';
import { withTime } from '$stylist/calendar/function/script/date/with-time';

export const createDateTimePickerState = (getProps: () => RecipeDateTimePicker) => {
	const props = $derived(getProps());
	const toDate = (value: Date | string | { start: Date | null; end: Date | null } | undefined) => {
		if (value instanceof Date) return value;
		if (typeof value === 'string') return fromInputDateString(value);
		return undefined;
	};

	let isOpen = $state(false);
	let selectedDate = $state<Date>(
		untrack(() => (props.value instanceof Date ? props.value : now()))
	);
	let selectedTime = $state('12:00');
	let dateInputRef = $state<HTMLInputElement | undefined>(undefined);
	let datePickerRef = $state<HTMLDivElement | undefined>(undefined);

	function formatTime(date: Date): string {
		return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
	}

	$effect(() => {
		selectedDate = props.value instanceof Date ? props.value : now();
		selectedTime = formatTime(selectedDate);
	});

	function handleDateChange(event: CustomEvent<Date> | Event) {
		if ('detail' in event) {
			selectedDate = cloneDate((event as CustomEvent<Date>).detail);
		} else {
			const target = event.target as HTMLInputElement;
			if (target.value) {
				selectedDate = fromInputDateTime(target.value, selectedTime);
			}
		}

		updateDateTime();
	}

	function handleDateValueChange(value: DatePickerValue, event?: Event) {
		if (!value || typeof value !== 'string') return;
		selectedDate = fromInputDateTime(value, selectedTime);
		updateDateTime(event);
	}

	function handleTimeChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		const [hours, minutes] = target.value.split(':').map(Number);
		selectedDate = withTime(selectedDate, hours, minutes);
		selectedTime = formatTime(selectedDate);
		updateDateTime();
	}

	function updateDateTime(sourceEvent?: Event) {
		props.onChange?.(selectedDate, sourceEvent);
		dateInputRef?.dispatchEvent(
			new CustomEvent('change', { detail: { date: cloneDate(selectedDate) }, bubbles: true })
		);
	}

	function toggleDropdown() {
		if (!props.disabled) {
			isOpen = !isOpen;
		}
	}

	$effect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				dateInputRef &&
				datePickerRef &&
				!dateInputRef.contains(event.target as Node) &&
				!datePickerRef.contains(event.target as Node)
			) {
				isOpen = false;
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	const timeOptions = $derived.by(() => {
		const values: string[] = [];
		for (const hour of Array.from({ length: 24 }, (_, index) => index)) {
			for (const minute of [0, 15, 30, 45]) {
				values.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
			}
		}
		return values;
	});

	return {
		get isOpen() {
			return isOpen;
		},
		get selectedDate() {
			return selectedDate;
		},
		get selectedTime() {
			return selectedTime;
		},
		get disabled() {
			return props.disabled ?? false;
		},
		get className() {
			return props.class ?? '';
		},
		get dateClass() {
			return props.dateClass ?? '';
		},
		get timeClass() {
			return props.timeClass ?? '';
		},
		get dropdownClass() {
			return props.dropdownClass ?? '';
		},
		get minDate() {
			return toDate(props.minDate);
		},
		get maxDate() {
			return toDate(props.maxDate);
		},
		get timeOptions() {
			return timeOptions;
		},
		dateInputAction(node: HTMLInputElement) {
			dateInputRef = node;
			return {
				destroy() {
					if (dateInputRef === node) {
						dateInputRef = undefined;
					}
				}
			};
		},
		datePickerAction(node: HTMLDivElement) {
			datePickerRef = node;
			return {
				destroy() {
					if (datePickerRef === node) {
						datePickerRef = undefined;
					}
				}
			};
		},
		handleDateChange,
		handleDateValueChange,
		handleTimeChange,
		toggleDropdown
	};
};

export default createDateTimePickerState;
