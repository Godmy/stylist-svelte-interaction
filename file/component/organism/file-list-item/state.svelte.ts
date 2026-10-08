import { FileListItemManager } from '$stylist/file/class/manager/file-list-item';
import type { RecipeFileListItem } from '$stylist/file/interface/recipe/file-list-item';
import type { SlotFileItem } from '$stylist/file/interface/slot/file-item';

export function createFileListItemState(getProps: () => RecipeFileListItem) {
	const props = $derived(getProps());
	const item = $derived(props.item);
	const fileItem = $derived(item as SlotFileItem);
	const showThumbnail = $derived(props.showThumbnail ?? false);
	const showSize = $derived(props.showSize ?? true);
	const showModified = $derived(props.showModified ?? true);
	const showOwner = $derived(props.showOwner ?? false);
	const enableSelection = $derived(props.enableSelection ?? true);
	const variant = $derived(props.variant ?? 'default');
	const disabled = $derived(props.disabled ?? false);
	const classes = $derived([props.class || ''].filter(Boolean).join(' '));
	let isSelected = $state(false);

	const restProps = $derived.by(() => {
		const {
			item: _item,
			class: _class,
			cellClass,
			onItemSelect,
			onItemDoubleClick,
			onItemAction,
			showThumbnail: _showThumbnail,
			showSize: _showSize,
			showModified: _showModified,
			showOwner: _showOwner,
			enableSelection: _enableSelection,
			disabled: _disabled,
			variant: _variant,
			...rest
		} = props;

		return rest;
	});

	$effect(() => {
		isSelected = item?.selected || false;
	});

	function handleSelect(): void {
		FileListItemManager.handleSelect(
			fileItem,
			disabled,
			enableSelection,
			isSelected,
			(value) => {
				isSelected = value;
			},
			(selectedItem) => {
				props.onItemSelect?.(selectedItem as Parameters<NonNullable<typeof props.onItemSelect>>[0]);
			}
		);
	}

	function handleDoubleClick(): void {
		FileListItemManager.handleDoubleClick(fileItem, disabled, (selectedItem) => {
			props.onItemDoubleClick?.(
				selectedItem as Parameters<NonNullable<typeof props.onItemDoubleClick>>[0]
			);
		});
	}

	function handleAction(action: string): void {
		FileListItemManager.handleAction(fileItem, action, disabled, (selectedItem, actionName) => {
			props.onItemAction?.(
				selectedItem as Parameters<NonNullable<typeof props.onItemAction>>[0],
				actionName
			);
		});
	}

	return {
		get variant() {
			return variant;
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
		get item() {
			return item;
		},
		get showThumbnail() {
			return showThumbnail;
		},
		get showSize() {
			return showSize;
		},
		get showModified() {
			return showModified;
		},
		get showOwner() {
			return showOwner;
		},
		get enableSelection() {
			return enableSelection;
		},
		get isSelected() {
			return isSelected;
		},
		get restProps() {
			return restProps;
		},
		get iconName() {
			return FileListItemManager.getFileIcon(fileItem);
		},
		handleSelect,
		handleDoubleClick,
		handleAction
	};
}
