import type { RecipeDateTimePicker as IDateTimePickerProps } from '$stylist/calendar/interface/recipe/date-time-picker';
import type { DatePickerValue } from '$stylist/calendar/interface/slot/date-picker';

export const createDateTimePickerState = (getProps: () => IDateTimePickerProps) => {
	const props = $derived(getProps());
	const toDate = (value: Date | string | { start: Date | null; end: Date | null } | undefined) => {
		if (value instanceof Date) return value;
		if (typeof value === 'string') return new Date(`${value}T00:00:00`);
		return undefined;
	};

	let isOpen = $state(false);
	let selectedDate = $state<Date>(props.value instanceof Date ? props.value : new Date());
	let selectedTime = $state('12:00');
	let dateInputRef = $state<HTMLInputElement | undefined>(undefined);
	let datePickerRef = $state<HTMLDivElement | undefined>(undefined);

	function formatTime(date: Date): string {
		return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
	}

	$effect(() => {
		selectedDate = props.value instanceof Date ? props.value : new Date();
		selectedTime = formatTime(selectedDate);
	});

	function handleDateChange(event: CustomEvent<Date> | Event) {
		if ('detail' in event) {
			selectedDate = new Date((event as CustomEvent<Date>).detail);
		} else {
			const target = event.target as HTMLInputElement;
			if (target.value) {
				selectedDate = new Date(`${target.value}T${selectedTime}:00`);
			}
		}

		updateDateTime();
	}

	function handleDateValueChange(value: DatePickerValue, event?: Event) {
		if (!value || typeof value !== 'string') return;
		selectedDate = new Date(`${value}T${selectedTime}:00`);
		updateDateTime(event);
	}

	function handleTimeChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		const [hours, minutes] = target.value.split(':').map(Number);
		selectedDate.setHours(hours, minutes, 0, 0);
		selectedDate = new Date(selectedDate);
		selectedTime = formatTime(selectedDate);
		updateDateTime();
	}

	function updateDateTime(sourceEvent?: Event) {
		props.onChange?.(selectedDate, sourceEvent);
		dateInputRef?.dispatchEvent(
			new CustomEvent('change', { detail: { date: new Date(selectedDate) }, bubbles: true })
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
