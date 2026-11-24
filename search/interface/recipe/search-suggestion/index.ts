import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlDiv } from '$stylist/html/interface/recipe/div';
import type { SlotSearchSkin } from '$stylist/search/interface/slot/search-skin';
import type { SearchSuggestionItem } from '$stylist/search/type/object/search-suggestion-item';

/** Typeahead suggestion list (`<ul>` of buttons) with loading and empty states. */
export interface RecipeSearchSuggestion extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlDiv, 'children' | 'class'>,
		{
			suggestions?: SearchSuggestionItem[];
			query?: string;
			loading?: boolean;
			class?: string;
			suggestionClass?: string;
			/** Called when a suggestion is picked. */
			onValueChange?: (suggestion: SearchSuggestionItem) => void;
			/** @default 5 */
			maxSuggestions?: number;
		},
		SlotSearchSkin
	]
> {}
