import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
export interface SlotAccordionGroup extends HTMLAttributes<HTMLDivElement> {
	children?: Snippet;
	defaultValues?: string[];
	value?: string[];
	onValueChange?: (value: string[]) => void;
	class?: string;
}
