import type { HTMLAttributes } from 'svelte/elements';
export interface RecipeSearchForm extends HTMLAttributes<HTMLFormElement> {
	query?: string;
	placeholder?: string;
	class?: string;
}
