import type { SlotDropItem } from '$stylist/file/interface/slot/drop-item';

export class DropZoneManager {
	static handleDragOver(
		event: DragEvent,
		setIsDragOver: (value: boolean) => void,
		onDragOver?: (event: DragEvent) => void
	): void {
		event.preventDefault();
		setIsDragOver(true);
		onDragOver?.(event);
	}

	static clearAll(): SlotDropItem[] {
		return [];
	}

	static formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	static handleDragLeave(
		event: DragEvent,
		setIsDragOver: (value: boolean) => void,
		onDragLeave?: (event: DragEvent) => void
	): void {
		event.preventDefault();
		setIsDragOver(false);
		onDragLeave?.(event);
	}

	static handleDrop(
		event: DragEvent,
		setIsDragOver: (value: boolean) => void,
		disabled: boolean,
		processFiles: (files: FileList) => void
	): void {
		event.preventDefault();
		setIsDragOver(false);
		if (disabled) return;
		const files = event.dataTransfer?.files;
		if (files && files.length > 0) processFiles(files);
	}

	static handleFileInput(
		event: Event,
		disabled: boolean,
		processFiles: (files: FileList) => void
	): void {
		if (disabled) return;
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) processFiles(target.files);
	}

	static processFiles(
		fileList: FileList,
		items: SlotDropItem[],
		accept: string,
		maxSize: number,
		maxItems: number,
		onItemAdded?: (item: SlotDropItem) => void,
		onDrop?: (items: SlotDropItem[]) => void
	): SlotDropItem[] {
		const newItems: SlotDropItem[] = [];
		for (let i = 0; i < fileList.length; i++) {
			const file = fileList[i];
			if (file.size > maxSize) continue;
			if (
				accept !== '*' &&
				!accept
					.split(',')
					.some((type) =>
						type.trim().startsWith('.')
							? file.name.toLowerCase().endsWith(type.trim().toLowerCase())
							: file.type.startsWith(type.trim())
					)
			) {
				continue;
			}
			if (items.length + newItems.length >= maxItems) break;
			const newItem: SlotDropItem = {
				id: `${file.name}-${file.size}-${file.lastModified}`,
				name: file.name,
				type: file.type || 'unknown',
				size: file.size,
				data: file
			};
			newItems.push(newItem);
			onItemAdded?.(newItem);
		}
		if (newItems.length === 0) return items;
		const allItems = [...items, ...newItems];
		onDrop?.(allItems);
		return allItems;
	}

	static removeItem(
		id: string,
		items: SlotDropItem[],
		onItemRemoved?: (item: SlotDropItem) => void
	): SlotDropItem[] {
		const item = items.find((current) => current.id === id);
		if (!item) return items;
		onItemRemoved?.(item);
		return items.filter((current) => current.id !== id);
	}
}
