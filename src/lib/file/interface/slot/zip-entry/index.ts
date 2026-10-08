import type { FileItemType } from '$stylist/file/type/alias/file-item-type';

export interface SlotZipEntry {
	id: string;
	name: string;
	type: FileItemType;
	size?: number;
	compressedSize?: number;
	modified?: Date;
	isText?: boolean;
	path: string;
	parentPath?: string;
}
