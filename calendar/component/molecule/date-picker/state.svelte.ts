import type { RecipeDatePicker } from '$stylist/calendar/interface/recipe/date-picker';

export const createDatePickerState = (getProps: () => RecipeDatePicker) => {
	const props = $derived(getProps());
	const toInputDate = (
		value: Date | string | { start: Date | null; end: Date | null } | undefined
	) => {
		if (value instanceof Date) return value.toISOString().split('T')[0];
		if (typeof value === 'string') return value;
		return undefined;
	};

	let internalValue = $state('');
	let isOpen = $state(false);

	$effect(() => {
		if (props.value instanceof Date) {
			internalValue = props.value.toISOString().split('T')[0];
			return;
		}

		internalValue = '';
	});

	function handleDateChange(event: Event) {
		const target = event.target as HTMLInputElement;
		internalValue = target.value;
		const value = internalValue ? new Date(`${internalValue}T00:00:00`) : undefined;
		props.onChange?.(value, event);
		target.dispatchEvent(new CustomEvent('change', { detail: value, bubbles: true }));
		isOpen = false;
	}

	function openPicker() {
		if (!props.disabled) {
			isOpen = true;
		}
	}

	const displayValue = $derived(
		internalValue
			? new Date(`${internalValue}T00:00:00`).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				})
			: ''
	);
	const minValue = $derived(toInputDate(props.minDate));
	const maxValue = $derived(toInputDate(props.maxDate));
	const restProps = $derived.by(() => {
		const {
			value: _value,
			minDate: _minDate,
			maxDate: _maxDate,
			disabled: _disabled,
			placeholder: _placeholder,
			dateFormat: _dateFormat,
			onInput: _onInput,
			onValueInput: _onValueInput,
			onValueChange: _onValueChange,
			onChange: _onChange,
			...rest
		} = props;

		return rest;
	});

	return {
		get internalValue() {
			return internalValue;
		},
		set internalValue(value: string) {
			internalValue = value;
		},
		get isOpen() {
			return isOpen;
		},
		get disabled() {
			return props.disabled ?? false;
		},
		get placeholder() {
			return props.placeholder ?? 'Select date';
		},
		get displayValue() {
			return displayValue;
		},
		get minValue() {
			return minValue;
		},
		get maxValue() {
			return maxValue;
		},
		get restProps() {
			return restProps;
		},
		handleDateChange,
		openPicker
	};
};

export default createDatePickerState;
