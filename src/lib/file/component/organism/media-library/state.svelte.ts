import { MediaLibraryManager } from '$stylist/file/class/manager/media-library';
import type { RecipeMediaLibrary } from '$stylist/file/interface/recipe/media-library';
import type { MediaType } from '$stylist/file/type/alias/media-library-media-type';
import type { SlotMediaItem } from '$stylist/file/interface/slot/media-item';

export function createMediaLibraryState(getProps: () => RecipeMediaLibrary) {
	const props = $derived(getProps());
	let searchQuery = $state('');
	let selectedViewMode = $state(props.viewMode ?? 'grid');
	let selectedItems = $state<string[]>([]);
	let fileInputRef = $state<HTMLInputElement | null>(null);

	const items = $derived(props.items ?? []);
	const allowDelete = $derived(props.allowDelete ?? true);
	const allowDownload = $derived(props.allowDownload ?? true);
	const allowUpload = $derived(props.allowUpload ?? true);
	const searchPlaceholder = $derived(props.searchPlaceholder ?? 'Search media...');
	const headerClass = $derived(props.headerClass ?? '');
	const toolbarClass = $derived(props.toolbarClass ?? '');
	const gridClass = $derived(props.gridClass ?? '');
	const itemClass = $derived(props.itemClass ?? '');

	const hostClasses = $derived(`ml-host ${props.class ?? ''}`.trim());

	const filteredItems = $derived.by(() => {
		if (!searchQuery) return items;
		return items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
	});

	function handleFileUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files && props.onUpload) {
			props.onUpload(target.files);
			target.value = '';
		}
	}

	function handleItemSelect(item: SlotMediaItem) {
		props.onItemSelect?.(item);
	}

	function handleItemDelete(id: string) {
		props.onItemDelete?.(id);
	}

	function handleItemDownload(id: string) {
		props.onItemDownload?.(id);
	}

	function triggerFileInput() {
		fileInputRef?.click();
	}

	function getFileIcon(type: MediaType): string {
		switch (type) {
			case 'image':
				return 'image';
			case 'video':
				return 'video';
			case 'audio':
				return 'audio';
			case 'document':
				return 'file';
			default:
				return 'file';
		}
	}

	function toggleItemSelection(id: string) {
		if (selectedItems.includes(id)) {
			selectedItems = selectedItems.filter((i) => i !== id);
		} else {
			selectedItems = [...selectedItems, id];
		}
	}

	const restProps = $derived.by(() => {
		const {
			class: _class,
			items: _items,
			onItemSelect: _onItemSelect,
			onItemDelete: _onItemDelete,
			onItemDownload: _onItemDownload,
			onUpload: _onUpload,
			viewMode: _viewMode,
			allowDelete: _allowDelete,
			allowDownload: _allowDownload,
			allowUpload: _allowUpload,
			searchPlaceholder: _searchPlaceholder,
			headerClass: _headerClass,
			toolbarClass: _toolbarClass,
			gridClass: _gridClass,
			itemClass: _itemClass,
			...rest
		} = props;
		return rest;
	});

	return {
		get searchQuery() {
			return searchQuery;
		},
		set searchQuery(val: string) {
			searchQuery = val;
		},
		get selectedViewMode() {
			return selectedViewMode;
		},
		set selectedViewMode(val: 'grid' | 'list') {
			selectedViewMode = val;
		},
		get selectedItems() {
			return selectedItems;
		},
		set selectedItems(val: string[]) {
			selectedItems = val;
		},
		get fileInputRef() {
			return fileInputRef;
		},
		set fileInputRef(val: HTMLInputElement | null) {
			fileInputRef = val;
		},
		get items() {
			return items;
		},
		get filteredItems() {
			return filteredItems;
		},
		get allowDelete() {
			return allowDelete;
		},
		get allowDownload() {
			return allowDownload;
		},
		get allowUpload() {
			return allowUpload;
		},
		get searchPlaceholder() {
			return searchPlaceholder;
		},
		get headerClass() {
			return headerClass;
		},
		get toolbarClass() {
			return toolbarClass;
		},
		get gridClass() {
			return gridClass;
		},
		get itemClass() {
			return itemClass;
		},
		get hostClasses() {
			return hostClasses;
		},
		get restProps() {
			return restProps;
		},
		handleFileUpload,
		handleItemSelect,
		handleItemDelete,
		handleItemDownload,
		triggerFileInput,
		getFileIcon,
		formatMediaFileSize: MediaLibraryManager.formatFileSize,
		formatMediaDate: MediaLibraryManager.formatDate,
		toggleItemSelection
	};
}
