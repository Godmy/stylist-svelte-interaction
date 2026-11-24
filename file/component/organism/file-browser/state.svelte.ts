import { FileBrowserManager } from '$stylist/file/class/manager/file-browser';
import type { RecipeFileBrowser } from '$stylist/file/interface/recipe/file-browser';
import type { SlotFolderItem } from '$stylist/file/interface/slot/folder-item';
import { toSet } from '$stylist/theme/function/script/collection/to-set';

export function createFileBrowserState(getProps: () => RecipeFileBrowser) {
	const props = $derived(getProps());
	const items = $derived(props.items ?? []);
	const showItemCount = $derived(props.showItemCount ?? true);
	const enableSelection = $derived(props.enableSelection ?? true);
	const defaultExpanded = $derived(props.defaultExpanded ?? false);
	const disabled = $derived(props.disabled ?? false);
	const classes = $derived([props.class || ''].filter(Boolean).join(' '));
	let expandedItems = $state<Set<string>>(toSet());
	let selectedItem = $state<SlotFolderItem | null>(null);

	const restProps = $derived.by(() => {
		const {
			items: _items,
			class: _class,
			itemClass,
			contentClass,
			onItemSelect,
			onItemToggle,
			onItemAction,
			showItemCount: _showItemCount,
			enableSelection: _enableSelection,
			defaultExpanded: _defaultExpanded,
			disabled: _disabled,
			...rest
		} = props;

		return rest;
	});

	$effect(() => {
		if (!defaultExpanded) {
			return;
		}

		const folderIds = (folderItems: SlotFolderItem[]): string[] =>
			folderItems.flatMap((item) =>
				item.type === 'file' ? [] : [item.id, ...folderIds(item.children ?? [])]
			);
		expandedItems = toSet(folderIds(items));
	});

	function setExpandedItems(nextItems: Set<string>): void {
		expandedItems = nextItems;
	}

	function setSelectedItem(item: SlotFolderItem | null): void {
		selectedItem = item;
	}

	function toggleItem(item: SlotFolderItem): void {
		FileBrowserManager.toggleItem(
			item,
			disabled,
			expandedItems,
			setExpandedItems,
			props.onItemToggle
		);
	}

	function handleSelect(item: SlotFolderItem): void {
		FileBrowserManager.handleSelect(
			item,
			enableSelection,
			disabled,
			setSelectedItem,
			props.onItemSelect
		);
	}

	function handleAction(item: SlotFolderItem, action: string): void {
		FileBrowserManager.handleAction(item, action, props.onItemAction);
	}

	function isExpanded(id: string): boolean {
		return FileBrowserManager.isExpanded(id, expandedItems);
	}

	return {
		get variant() {
			return 'default';
		},
		get size() {
			return 'md';
		},
		get disabled() {
			return disabled;
		},
		get classes() {
			return classes;
		},
		get items() {
			return items;
		},
		get showItemCount() {
			return showItemCount;
		},
		get selectedItem() {
			return selectedItem;
		},
		get restProps() {
			return restProps;
		},
		toggleItem,
		handleSelect,
		handleAction,
		isExpanded
	};
}
