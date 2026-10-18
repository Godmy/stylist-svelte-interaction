import type { Snippet } from 'svelte';
export interface RecipeBottomSheet {
	open?: boolean;
	title?: string;
	closable?: boolean;
	onClose?: () => void;
	children?: Snippet;
	actions?: Snippet;
}
