export interface SlotAutoSearch {
	value?: string;
	placeholder?: string;
	onValueInput?: (value: string) => void;
	onValueChange?: (value: string) => void;
	onInput?: (value: string) => void;
	class?: string;
}
