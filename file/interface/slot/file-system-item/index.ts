import type { FileItemType } from '$stylist/file/type/alias/file-item-type';

export interface SlotFileSystemItem {
	id: string;
	name: string;
	type: FileItemType;
	size?: number;
	modified?: Date;
	created?: Date;
	children?: SlotFileSystemItem[];
	path?: string;
	icon?: string;
}
