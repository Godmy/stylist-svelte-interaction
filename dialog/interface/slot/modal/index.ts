import type { HTMLAttributes } from 'svelte/elements';
export interface SlotModal extends HTMLAttributes<HTMLDivElement> {
	open?: boolean;
	title?: string;
	class?: string;
	onClose?: () => void;
}
