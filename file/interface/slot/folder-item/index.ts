import type { Snippet } from 'svelte';

export interface SlotFolderItem {
	id: string;
	name: string;
	children?: SlotFolderItem[];
	expanded?: boolean;
	selected?: boolean;
	type?: 'folder' | 'file';
	icon?: Snippet;
	data?: unknown;
}
