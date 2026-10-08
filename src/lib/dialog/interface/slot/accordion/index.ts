import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
export interface SlotAccordion extends HTMLAttributes<HTMLDivElement> {
	children?: Snippet;
	defaultValue?: string;
	class?: string;
}
