import type { AutoCompleteOption } from '$stylist/search/type/object/auto-complete-option';
export interface SlotAutoComplete {
	options?: AutoCompleteOption[];
	placeholder?: string;
	value?: string;
	class?: string;
	inputClass?: string;
	listClass?: string;
	itemClass?: string;
	selectedClass?: string;
	onInput?: (value: string) => void;
	onSelect?: (option: AutoCompleteOption) => void;
	debounce?: number;
	showAllSuggestions?: boolean;
}
