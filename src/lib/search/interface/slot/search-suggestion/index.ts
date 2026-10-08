import type { HTMLAttributes } from 'svelte/elements';
export interface SlotSearchSuggestion extends Omit<HTMLAttributes<HTMLDivElement>, 'class'> {
	suggestions: {
		id: string;
		text: string;
		category?: string;
		icon?: string;
		count?: number;
	}[];
	query?: string;
	loading?: boolean;
	class?: string;
	suggestionClass?: string;
	headerClass?: string;
	onValueInput?: (suggestion: {
		id: string;
		text: string;
		category?: string;
		icon?: string;
		count?: number;
	}) => void;
	onValueChange?: (suggestion: {
		id: string;
		text: string;
		category?: string;
		icon?: string;
		count?: number;
	}) => void;
	maxSuggestions?: number;
}
