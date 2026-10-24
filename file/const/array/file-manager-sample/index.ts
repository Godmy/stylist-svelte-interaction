import type { FileManagerEntry } from '$stylist/file/type/struct/file-manager-entry';

/** Fictional storage metadata; no file contents are embedded. */
export const FILE_MANAGER_SAMPLE: readonly FileManagerEntry[] = [
	{
		id: 'photos',
		name: 'Фотографии',
		parentId: null,
		kind: 'folder',
		size: 0,
		modified: '2026-10-20'
	},
	{
		id: 'docs',
		name: 'Документы',
		parentId: null,
		kind: 'folder',
		size: 0,
		modified: '2026-10-20'
	},
	{
		id: 'cover',
		name: 'Обложка.jpg',
		parentId: 'photos',
		kind: 'image',
		size: 245760,
		modified: '2026-10-19'
	},
	{
		id: 'team',
		name: 'Команда.png',
		parentId: 'photos',
		kind: 'image',
		size: 184320,
		modified: '2026-10-18'
	},
	{
		id: 'guide',
		name: 'Памятка.pdf',
		parentId: 'docs',
		kind: 'document',
		size: 51200,
		modified: '2026-10-17'
	},
	{
		id: 'archive',
		name: 'Проект.zip',
		parentId: null,
		kind: 'archive',
		size: 2097152,
		modified: '2026-10-16'
	}
];
