import type { FileManagerEntry } from '$stylist/file/type/struct/file-manager-entry';

/** Classify a file by its extension without trusting uploaded MIME claims. */
export function fileKind(name: string): Exclude<FileManagerEntry['kind'], 'folder'> {
	const extension = name.toLowerCase().split('.').pop() ?? '';
	if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(extension)) return 'image';
	if (['pdf', 'txt', 'md', 'doc', 'docx'].includes(extension)) return 'document';
	if (['zip', 'tar', 'gz', '7z'].includes(extension)) return 'archive';
	return 'other';
}
