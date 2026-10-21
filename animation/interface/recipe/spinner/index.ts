import type { HTMLAttributes } from 'svelte/elements';
export interface RecipeSpinner extends HTMLAttributes<HTMLSpanElement> {
	size?: 'sm' | 'md' | 'lg';
	label?: string;
	class?: string;
	style?: string;
}
