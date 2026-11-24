import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { RecipeHtmlDiv } from '$stylist/html/interface/recipe/div';
import type { SlotSearchSkin } from '$stylist/search/interface/slot/search-skin';
import type { SearchResultItem } from '$stylist/search/type/object/search-results-item';

/** Result list (`<ul>` of buttons) with loading and empty states. */
export interface RecipeSearchResults extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlDiv, 'children' | 'class' | 'results'>,
		{
			results?: SearchResultItem[];
			query?: string;
			loading?: boolean;
			class?: string;
			onResultClick?: (result: SearchResultItem) => void;
			/** @default true */
			showMetadata?: boolean;
			/** @default 10 */
			maxResults?: number;
		},
		SlotSearchSkin
	]
> {}
