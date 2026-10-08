import type { SlotZipEntry } from '$stylist/file/interface/slot/zip-entry';

export class ZipViewerManager {
	static handleSearchInput(event: Event, setSearchQuery: (value: string) => void): void {
		const target = event.target as HTMLInputElement;
		setSearchQuery(target.value);
	}

	static formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	static getEntryIcon(entry: SlotZipEntry): string {
		return entry.type === 'directory' ? 'folder' : 'file';
	}

	static handleDownload(
		entry: SlotZipEntry,
		disabled: boolean,
		onEntryDownload?: (entry: SlotZipEntry) => void
	): void {
		if (!disabled) onEntryDownload?.(entry);
	}

	static handleEntryClick(
		entry: SlotZipEntry,
		disabled: boolean,
		expandedFolders: Set<string>,
		setExpandedFolders: (folders: Set<string>) => void,
		onEntryClick?: (entry: SlotZipEntry) => void
	): void {
		if (disabled) return;
		if (entry.type === 'directory') {
			const isExpanded = expandedFolders.has(entry.path);
			const newSet = new Set(expandedFolders);
			if (isExpanded) newSet.delete(entry.path);
			else newSet.add(entry.path);
			setExpandedFolders(newSet);
		}
		onEntryClick?.(entry);
	}

	static handleExtract(
		entry: SlotZipEntry,
		disabled: boolean,
		onEntryExtract?: (entry: SlotZipEntry) => void
	): void {
		if (!disabled) onEntryExtract?.(entry);
	}

	static handlePreview(
		entry: SlotZipEntry,
		disabled: boolean,
		onEntryPreview?: (entry: SlotZipEntry) => void
	): void {
		if (!disabled) onEntryPreview?.(entry);
	}

	static toggleFolder(
		entry: SlotZipEntry,
		disabled: boolean,
		expandedFolders: Set<string>,
		setExpandedFolders: (folders: Set<string>) => void
	): void {
		if (entry.type === 'file' || disabled) return;
		const newSet = new Set(expandedFolders);
		const isExpanded = newSet.has(entry.path);
		if (isExpanded) newSet.delete(entry.path);
		else newSet.add(entry.path);
		setExpandedFolders(newSet);
	}
}
