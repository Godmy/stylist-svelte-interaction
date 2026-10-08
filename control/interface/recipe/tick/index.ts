import type { HTMLAttributes } from 'svelte/elements';

export interface RecipeTick extends HTMLAttributes<HTMLDivElement> {
	value?: number;
	position?: number;
	active?: boolean;
	label?: string;
	class?: string;
}
