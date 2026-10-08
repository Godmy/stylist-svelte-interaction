import type { HTMLAttributes } from 'svelte/elements';
import type { SearchResultItem } from '$stylist/search/type/object/search-results-item';

export interface RecipeSearchResults
	extends Omit<HTMLAttributes<HTMLDivElement>, 'class' | 'results'> {
	results?: SearchResultItem[];
	query?: string;
	loading?: boolean;
	class?: string | null;
	onResultClick?: (result: SearchResultItem) => void;
	showMetadata?: boolean;
	maxResults?: number;
}
