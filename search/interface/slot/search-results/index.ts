import type { SearchResultItem } from '$stylist/search/type/object/search-results-item';

export interface SlotSearchResults {
	results?: SearchResultItem[];
	query?: string;
	loading?: boolean;
	class?: string;
	onResultClick?: (result: SearchResultItem) => void;
	/** @default true */
	showMetadata?: boolean;
	/** @default 10 */
	maxResults?: number;
}
