export type DatePickerValue = Date | string | { start: Date | null; end: Date | null } | undefined;

export interface SlotDatePicker {
	value?: DatePickerValue;
	minDate?: Date | string;
	maxDate?: Date | string;
	disabled?: boolean;
	placeholder?: string;
	dateFormat?: string;
	class?: string;
	dateClass?: string;
	timeClass?: string;
	dropdownClass?: string;
	calendarClass?: string;
	inputClass?: string;
	buttonClass?: string;
	label?: string;
	helperText?: string;
	error?: string;
	onChange?: (value: DatePickerValue, event?: Event) => void;
	onInput?: (value: DatePickerValue, event?: Event) => void;
	onValueInput?: (value: DatePickerValue, event?: Event) => void;
	onValueChange?: (value: DatePickerValue, event?: Event) => void;
}
