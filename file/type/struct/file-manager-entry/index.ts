/** A folder or file record; `parentId` null places it at the root. */
export type FileManagerEntry = {
	id: string;
	name: string;
	parentId: string | null;
	kind: 'folder' | 'image' | 'document' | 'archive' | 'other';
	size: number;
	modified: string;
};
