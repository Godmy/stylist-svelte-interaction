export interface SlotFileItem {
	id: string;
	name: string;
	type: 'folder' | 'file' | 'image' | 'video' | 'audio' | 'document' | 'archive' | 'code' | 'text';
	size?: number;
	modified?: Date;
	created?: Date;
	path?: string;
	thumbnail?: string;
	permissions?: string;
	owner?: string;
	icon?: string;
	selected?: boolean;
}
