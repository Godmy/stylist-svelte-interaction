import type { SlotAutocompleteDropdownOption } from '$stylist/control/interface/slot/autocomplete-dropdown-option';
export interface SlotAutocompleteDropdown {
	options: SlotAutocompleteDropdownOption[];
	value?: string;
	placeholder?: string;
	onValueInput?: (value: string) => void;
	onValueChange?: (value: string) => void;
	onChange?: (value: string) => void;
	class?: string;
}
