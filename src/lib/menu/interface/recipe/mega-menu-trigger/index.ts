import type { HTMLButtonAttributes } from 'svelte/elements';

export interface RecipeMegaMenuTrigger extends Omit<HTMLButtonAttributes, 'children'> {
	/** Trigger text */
	label: string;
	/** Whether the controlled panel is open */
	open?: boolean;
	/** Whether the section contains the current page */
	active?: boolean;
	/** Id of the controlled panel */
	controls?: string;
	/** Additional CSS classes */
	class?: string;
}
