import { DropZoneManager } from '$stylist/file/class/manager/drop-zone';
import type { RecipeDropZone } from '$stylist/file/interface/recipe/drop-zone';
import type { SlotDropItem } from '$stylist/file/interface/slot/drop-item';

export function createDropZoneState(getProps: () => RecipeDropZone) {
	const props = $derived(getProps());
	let isDragOver = $state(false);
	let items = $state<SlotDropItem[]>([]);
	let isProcessing = $state(false);
	let fileInputElement = $state<HTMLInputElement | null>(null);
	const accept = $derived(props.accept ?? '');
	const multiple = $derived(props.multiple ?? false);
	const maxSize = $derived(props.maxSize ?? Infinity);
	const maxItems = $derived(props.maxItems ?? Infinity);
	const label = $derived(props.label ?? 'Drop files here');
	const description = $derived(
		props.description ?? 'Drag files into the drop zone or browse from disk.'
	);
	const children = $derived(props.children);
	const disabled = $derived(props.disabled ?? false);
	const classes = $derived([props.class || ''].filter(Boolean).join(' '));

	const restProps = $derived.by(() => {
		const {
			children: _children,
			class: _class,
			accept: _accept,
			multiple: _multiple,
			disabled: _disabled,
			maxSize: _maxSize,
			maxItems: _maxItems,
			onDrop,
			onDragOver,
			onDragLeave,
			onItemAdded,
			onItemRemoved,
			preview,
			label: _label,
			description: _description,
			...rest
		} = props;

		return rest;
	});

	function processSelectedFiles(fileList: FileList): void {
		isProcessing = true;
		items = DropZoneManager.processFiles(
			fileList,
			items,
			accept || '*',
			maxSize,
			maxItems,
			props.onItemAdded,
			props.onDrop
		);
		isProcessing = false;
	}

	function handleDragOver(event: DragEvent): void {
		DropZoneManager.handleDragOver(
			event,
			(value) => {
				isDragOver = value;
			},
			props.onDragOver
		);
	}

	function handleDragLeave(event: DragEvent): void {
		DropZoneManager.handleDragLeave(
			event,
			(value) => {
				isDragOver = value;
			},
			props.onDragLeave
		);
	}

	function handleDrop(event: DragEvent): void {
		DropZoneManager.handleDrop(
			event,
			(value) => {
				isDragOver = value;
			},
			disabled,
			processSelectedFiles
		);
	}

	function handleFileInput(event: Event): void {
		DropZoneManager.handleFileInput(event, disabled, processSelectedFiles);
	}

	function browse(): void {
		if (!disabled) {
			fileInputElement?.click();
		}
	}

	function clearItems(): void {
		items = DropZoneManager.clearAll();
	}

	function removeDroppedItem(id: string): void {
		items = DropZoneManager.removeItem(id, items, props.onItemRemoved);
	}

	return {
		variant: 'default',
		size: 'md',
		get disabled() {
			return disabled;
		},
		get classes() {
			return classes;
		},
		get accept() {
			return accept;
		},
		get multiple() {
			return multiple;
		},
		get maxSize() {
			return maxSize;
		},
		get maxItems() {
			return maxItems;
		},
		get label() {
			return label;
		},
		get description() {
			return description;
		},
		get children() {
			return children;
		},
		get isDragOver() {
			return isDragOver;
		},
		get items() {
			return items;
		},
		get isProcessing() {
			return isProcessing;
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
		handleDragOver,
		handleDragLeave,
		handleDrop,
		handleFileInput,
		browse,
		clearItems,
		removeDroppedItem
	};
}
