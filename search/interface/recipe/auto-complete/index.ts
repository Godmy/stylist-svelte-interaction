import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlInputSearch } from '$stylist/html/interface/recipe/input-search';
import type { SlotSearchSkin } from '$stylist/search/interface/slot/search-skin';
import type { AutoCompleteOption } from '$stylist/search/type/object/auto-complete-option';

/** Combobox: a search field with a listbox; native attributes reach the control. */
export interface RecipeAutoComplete extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlInputSearch, 'value' | 'class'>,
		{
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
		},
		SlotSearchSkin
	]
> {}
