export type SearchResultItem = {
	id: string;
	type: 'user' | 'event' | 'document' | 'generic';
	title: string;
	description?: string;
	metadata?: {
		date?: string;
		author?: string;
		location?: string;
	};
};
