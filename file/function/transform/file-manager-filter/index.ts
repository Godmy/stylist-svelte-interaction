import type { FileManagerEntry } from '$stylist/file/type/struct/file-manager-entry';

/** Entries of one folder matching the query; folders stay navigable under a kind facet and sort first. */
export function fileManagerFilter(
	entries: readonly FileManagerEntry[],
	parentId: string | null,
	query = '',
	kind = ''
): FileManagerEntry[] {
	const needle = query.trim().toLowerCase();
	return entries
		.filter(
			(entry) =>
				entry.parentId === parentId &&
				(!needle || entry.name.toLowerCase().includes(needle)) &&
				(!kind || entry.kind === 'folder' || entry.kind === kind)
		)
		.sort(
			(a, b) =>
				Number(b.kind === 'folder') - Number(a.kind === 'folder') || a.name.localeCompare(b.name)
		);
}
