import type { HTMLAttributes } from 'svelte/elements';
export interface SlotDocumentPreview extends HTMLAttributes<HTMLDivElement> {
	title?: string;
	content?: string;
	format?: 'text' | 'json' | 'markdown';
	class?: string;
}
