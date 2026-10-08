import type { SlotFileItem } from '$stylist/file/interface/slot/file-item';

export class FileListItemManager {
	static handleSelect(
		item: SlotFileItem,
		disabled: boolean,
		enableSelection: boolean,
		isSelected: boolean,
		setIsSelected: (value: boolean) => void,
		onItemSelect?: (item: SlotFileItem) => void
	): void {
		if (disabled || !enableSelection) return;
		const newValue = !isSelected;
		setIsSelected(newValue);
		onItemSelect?.({ ...item, selected: newValue });
	}

	static formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	static getFileIcon(item: SlotFileItem): string {
		if (item.type === 'folder') return 'folder';
		if (item.type === 'image') return 'image';
		if (item.type === 'video') return 'video';
		if (item.type === 'audio') return 'music';
		if (item.type === 'archive') return 'archive';
		if (item.type === 'text' || item.type === 'document') return 'file-text';
		if (item.type === 'code') return 'code';
		return 'file';
	}

	static handleAction(
		item: SlotFileItem,
		action: string,
		disabled: boolean,
		onItemAction?: (item: SlotFileItem, action: string) => void
	): void {
		if (!disabled) onItemAction?.(item, action);
	}

	static handleDoubleClick(
		item: SlotFileItem,
		disabled: boolean,
		onItemDoubleClick?: (item: SlotFileItem) => void
	): void {
		if (!disabled) onItemDoubleClick?.(item);
	}
}
