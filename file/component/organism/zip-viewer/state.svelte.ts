import { ZipViewerManager } from '$stylist/file/class/manager/zip-viewer';
import type { RecipeZipViewer } from '$stylist/file/interface/recipe/zip-viewer';
import type { SlotZipEntry } from '$stylist/file/interface/slot/zip-entry';

export function createZipViewerState(getProps: () => RecipeZipViewer) {
	const props = $derived(getProps());
	let searchQuery = $state('');
	let expandedFolders = $state<Set<string>>(new Set());
	const entries = $derived(props.entries ?? []);
	const archiveName = $derived(props.archiveName ?? 'Archive.zip');
	const searchable = $derived(props.searchable ?? true);
	const showPath = $derived(props.showPath ?? true);
	const enableFiltering = $derived(props.enableFiltering ?? true);
	const defaultExpanded = $derived(props.defaultExpanded ?? false);
	const disabled = $derived(props.disabled ?? false);
	const classes = $derived([props.class || ''].filter(Boolean).join(' '));

	const restProps = $derived.by(() => {
		const {
			entries: _entries,
			archiveName: _archiveName,
			class: _class,
			entryClass,
			headerClass,
			onEntryClick,
			onEntryPreview,
			onEntryDownload,
			onEntryExtract,
			searchable: _searchable,
			showPath: _showPath,
			enableFiltering: _enableFiltering,
			defaultExpanded: _defaultExpanded,
			disabled: _disabled,
			...rest
		} = props;

		return rest;
	});

	const filteredEntries = $derived.by(() => {
		if (!enableFiltering || !searchQuery) {
			return entries;
		}

		const query = searchQuery.toLowerCase();
		return entries.filter(
			(entry) =>
				entry.name.toLowerCase().includes(query) || entry.path.toLowerCase().includes(query)
		);
	});

	const zipTree = $derived.by(() => {
		const sourceEntries = filteredEntries;
		const tree: SlotZipEntry[] = [];
		const map = new Map<string, SlotZipEntry>();

		for (const entry of sourceEntries) {
			map.set(entry.path, entry);
		}

		for (const entry of sourceEntries) {
			if (entry.type === 'directory') {
				if (!expandedFolders.has(entry.path) && !defaultExpanded) {
					continue;
				}

				const parts = entry.path.split('/').filter((part) => part);
				if (parts.length === 0) {
					tree.push(entry);
					continue;
				}

				let parentPath = `${parts.slice(0, parts.length - 1).join('/')}/`;
				if (parentPath === '/') {
					parentPath = '';
				}

				const parentExists = sourceEntries.some((item) => item.path === parentPath);
				if (
					parentPath === '' ||
					!parentExists ||
					!map.get(parentPath) ||
					expandedFolders.has(parentPath) ||
					defaultExpanded
				) {
					tree.push(entry);
				}

				continue;
			}

			const parentPath = entry.path.substring(0, entry.path.lastIndexOf('/') + 1);
			if (parentPath === '/' || expandedFolders.has(parentPath) || defaultExpanded) {
				tree.push(entry);
			}
		}

		return tree;
	});

	function setExpandedFolders(nextFolders: Set<string>): void {
		expandedFolders = nextFolders;
	}

	function handleSearchInput(event: Event): void {
		ZipViewerManager.handleSearchInput(event, (value) => {
			searchQuery = value;
		});
	}

	function handleEntryClick(entry: SlotZipEntry): void {
		ZipViewerManager.handleEntryClick(
			entry,
			disabled,
			expandedFolders,
			setExpandedFolders,
			props.onEntryClick
		);
	}

	function handlePreview(entry: SlotZipEntry): void {
		ZipViewerManager.handlePreview(entry, disabled, props.onEntryPreview);
	}

	function handleDownload(entry: SlotZipEntry): void {
		ZipViewerManager.handleDownload(entry, disabled, props.onEntryDownload);
	}

	function handleExtract(entry: SlotZipEntry): void {
		ZipViewerManager.handleExtract(entry, disabled, props.onEntryExtract);
	}

	function toggleFolder(entry: SlotZipEntry): void {
		ZipViewerManager.toggleFolder(entry, disabled, expandedFolders, setExpandedFolders);
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
		get archiveName() {
			return archiveName;
		},
		get searchable() {
			return searchable;
		},
		get showPath() {
			return showPath;
		},
		get searchQuery() {
			return searchQuery;
		},
		get expandedFolders() {
			return expandedFolders;
		},
		get filteredEntries() {
			return filteredEntries;
		},
		get zipTree() {
			return zipTree;
		},
		get restProps() {
			return restProps;
		},
		handleSearchInput,
		handleEntryClick,
		handlePreview,
		handleDownload,
		handleExtract,
		toggleFolder
	};
}
