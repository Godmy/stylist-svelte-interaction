import type { SlotFileSystemItem } from '$stylist/file/interface/slot/file-system-item';

export class FileExplorerManager {
	static handleItemClick(
		item: SlotFileSystemItem,
		enableSelection: boolean,
		multiselect: boolean,
		selectedItems: SlotFileSystemItem[],
		setSelectedItems: (items: SlotFileSystemItem[]) => void,
		onItemSelect?: (item: SlotFileSystemItem) => void
	): void {
		if (enableSelection) {
			if (multiselect) {
				setSelectedItems(
					selectedItems.some((current) => current.id === item.id)
						? selectedItems.filter((current) => current.id !== item.id)
						: [...selectedItems, item]
				);
			} else {
				setSelectedItems([item]);
			}
		}
		onItemSelect?.(item);
	}

	static formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	static getFileIcon(item: SlotFileSystemItem): string {
		return item.type === 'folder' ? 'folder' : 'file';
	}

	static handleDownload(
		item: SlotFileSystemItem,
		onDownload?: (item: SlotFileSystemItem) => void
	): void {
		onDownload?.(item);
	}

	static handleItemDoubleClick(
		item: SlotFileSystemItem,
		onItemDoubleClick?: (item: SlotFileSystemItem) => void
	): void {
		onItemDoubleClick?.(item);
	}

	static handleItemKeyDown(
		event: KeyboardEvent,
		item: SlotFileSystemItem,
		handleItemClick: () => void,
		handleItemDoubleClick: () => void
	): void {
		void item;
		if (event.key === ' ' || event.key === 'Spacebar') {
			event.preventDefault();
			handleItemClick();
			return;
		}
		if (event.key === 'Enter') {
			event.preventDefault();
			handleItemClick();
			handleItemDoubleClick();
		}
	}

	static handleSearchInput(event: Event, setSearchQuery: (value: string) => void): void {
		const target = event.target as HTMLInputElement;
		setSearchQuery(target.value);
	}

	static handleUpload(event: Event, onUpload?: (files: FileList) => void): void {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) onUpload?.(target.files);
	}

	static toggleViewMode(
		currentViewMode: 'grid' | 'list',
		setCurrentViewMode: (mode: 'grid' | 'list') => void
	): void {
		setCurrentViewMode(currentViewMode === 'list' ? 'grid' : 'list');
	}
}
