import { FileExplorerManager } from '$stylist/file/class/manager/file-explorer';
import type { RecipeFileExplorer } from '$stylist/file/interface/recipe/file-explorer';
import type { SlotFileSystemItem } from '$stylist/file/interface/slot/file-system-item';
import type { ViewMode } from '$stylist/file/type/alias/file-explorer-view-mode';

export function createFileExplorerState(getProps: () => RecipeFileExplorer) {
	const props = $derived(getProps());
	let selectedItems = $state<SlotFileSystemItem[]>([]);
	let searchQuery = $state('');
	let currentViewMode = $state<ViewMode>(props.viewMode ?? 'grid');
	let fileInputElement = $state<HTMLInputElement | null>(null);
	const currentPath = $derived(props.currentPath ?? '/');
	const searchable = $derived(props.searchable ?? true);
	const showPath = $derived(props.showPath ?? true);
	const enableSelection = $derived(props.enableSelection ?? true);
	const multiselect = $derived(props.multiselect ?? false);
	const items = $derived(props.items ?? []);
	const disabled = $derived(props.disabled ?? false);
	const classes = $derived([props.class || ''].filter(Boolean).join(' '));

	const pathParts = $derived(currentPath.split('/').filter((part: string) => part));
	const filteredItems = $derived.by(() => {
		const query = searchQuery.trim().toLowerCase();

		if (!query) {
			return items;
		}

		return items.filter((item) => {
			const path = typeof item.path === 'string' ? item.path.toLowerCase() : '';
			return item.name.toLowerCase().includes(query) || path.includes(query);
		});
	});

	const restProps = $derived.by(() => {
		const {
			items: _items,
			viewMode,
			currentPath: _currentPath,
			searchable: _searchable,
			showPath: _showPath,
			enableSelection: _enableSelection,
			multiselect: _multiselect,
			onItemSelect,
			onItemDoubleClick,
			onItemAction,
			class: _class,
			itemClass,
			headerClass,
			toolbarClass,
			searchClass,
			pathClass,
			onUpload,
			onDownload,
			...rest
		} = props;

		return rest;
	});

	function setSelectedItems(nextItems: SlotFileSystemItem[]): void {
		selectedItems = nextItems;
	}

	function handleItemClick(item: SlotFileSystemItem): void {
		FileExplorerManager.handleItemClick(
			item,
			enableSelection,
			multiselect,
			selectedItems,
			setSelectedItems,
			props.onItemSelect
		);
	}

	function handleItemDoubleClick(item: SlotFileSystemItem): void {
		FileExplorerManager.handleItemDoubleClick(item, props.onItemDoubleClick);
	}

	function handleItemKeyDown(event: KeyboardEvent, item: SlotFileSystemItem): void {
		FileExplorerManager.handleItemKeyDown(
			event,
			item,
			() => handleItemClick(item),
			() => handleItemDoubleClick(item)
		);
	}

	function handleSearchInput(event: Event): void {
		FileExplorerManager.handleSearchInput(event, (value) => {
			searchQuery = value;
		});
	}

	function handleUpload(event: Event): void {
		FileExplorerManager.handleUpload(event, props.onUpload);
	}

	function handleDownload(item: SlotFileSystemItem): void {
		FileExplorerManager.handleDownload(item, props.onDownload);
	}

	function toggleViewMode(): void {
		FileExplorerManager.toggleViewMode(currentViewMode, (mode) => {
			currentViewMode = mode;
		});
	}

	function openUploadDialog(): void {
		if (!disabled) {
			fileInputElement?.click();
		}
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
		get searchable() {
			return searchable;
		},
		get showPath() {
			return showPath;
		},
		get currentPath() {
			return currentPath;
		},
		get items() {
			return items;
		},
		get selectedItems() {
			return selectedItems;
		},
		get searchQuery() {
			return searchQuery;
		},
		get currentViewMode() {
			return currentViewMode;
		},
		get pathParts() {
			return pathParts;
		},
		get filteredItems() {
			return filteredItems;
		},
		get restProps() {
			return restProps;
		},
		get fileInputElement() {
			return fileInputElement;
		},
		set fileInputElement(value: HTMLInputElement | null) {
			fileInputElement = value;
		},
		handleItemClick,
		handleItemDoubleClick,
		handleItemKeyDown,
		handleSearchInput,
		handleUpload,
		handleDownload,
		toggleViewMode,
		openUploadDialog
	};
}
