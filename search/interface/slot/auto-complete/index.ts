import type { AutoCompleteOption } from '$stylist/search/type/object/auto-complete-option';

export interface SlotAutoComplete {
	options?: AutoCompleteOption[];
	placeholder?: string;
	/** Query text (`bind:value`); a pick sets the option label. */
	value?: string;
	class?: string;
	inputClass?: string;
	listClass?: string;
	itemClass?: string;
	/** Lists every option while the query is empty. */
	showAllSuggestions?: boolean;
	/** Called with the query on every input. */
	onValueInput?: (value: string) => void;
	onSelect?: (option: AutoCompleteOption) => void;
}
