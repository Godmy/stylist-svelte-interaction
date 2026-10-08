import type { HTMLAttributes } from 'svelte/elements';
export interface SlotDialog extends HTMLAttributes<HTMLDivElement> {
	open?: boolean;
	title?: string;
	description?: string;
	class?: string;
	onClose?: () => void;
}
