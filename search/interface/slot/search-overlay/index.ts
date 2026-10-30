import type { Snippet } from 'svelte';

export interface SlotSearchOverlay {
	/** Whether the field is shown (`bind:open`). */
	open?: boolean;
	/** Query text (`bind:query`); cleared when the overlay closes. */
	query?: string;
	placeholder?: string;
	class?: string;
	/** Popup content for a non-empty query; receives the trimmed query. */
	results?: Snippet<[string]>;
	/** Extra actions rendered after the toggle. */
	children?: Snippet;
	onOpenChange?: (open: boolean) => void;
}
