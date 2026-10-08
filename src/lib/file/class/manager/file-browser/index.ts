import type { SlotFolderItem } from '$stylist/file/interface/slot/folder-item';

export class FileBrowserManager {
	static toggleItem(
		item: SlotFolderItem,
		disabled: boolean,
		expandedItems: Set<string>,
		setExpandedItems: (items: Set<string>) => void,
		onItemToggle?: (item: SlotFolderItem, expanded: boolean) => void
	): void {
		if (item.type === 'file' || disabled) return;
		const newSet = new Set(expandedItems);
		const isExpanded = newSet.has(item.id);
		if (isExpanded) newSet.delete(item.id);
		else newSet.add(item.id);
		setExpandedItems(newSet);
		onItemToggle?.(item, !isExpanded);
	}

	static getItemCount(item: SlotFolderItem): number {
		if (!item.children) return 0;
		let count = 0;
		const stack = [...item.children];
		while (stack.length) {
			const current = stack.pop()!;
			if (current.children) stack.push(...current.children);
			count++;
		}
		return count;
	}

	static handleAction(
		item: SlotFolderItem,
		action: string,
		onItemAction?: (item: SlotFolderItem, action: string) => void
	): void {
		onItemAction?.(item, action);
	}

	static handleSelect(
		item: SlotFolderItem,
		enableSelection: boolean,
		disabled: boolean,
		setSelectedItem: (item: SlotFolderItem | null) => void,
		onItemSelect?: (item: SlotFolderItem) => void
	): void {
		if (!enableSelection || disabled) return;
		setSelectedItem(item);
		onItemSelect?.(item);
	}

	static isExpanded(id: string, expandedItems: Set<string>): boolean {
		return expandedItems.has(id);
	}
}
