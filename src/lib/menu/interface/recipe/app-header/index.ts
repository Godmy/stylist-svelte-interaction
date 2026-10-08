import type { Snippet } from 'svelte';
export interface RecipeAppHeader {
	class?: string;
	brand: string;
	brandHref?: string;
	navLinks?: {
		href: string;
		label: string;
		active?: boolean;
	}[];
	trailing?: Snippet;
}
