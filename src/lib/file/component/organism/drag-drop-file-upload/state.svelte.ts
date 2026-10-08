import { DragDropFileUploadManager } from '$stylist/file/class/manager/drag-drop-file-upload';
import type { RecipeDragDropFileUpload } from '$stylist/file/interface/recipe/drag-drop-file-upload';
import type { SlotDragDropUploadFile } from '$stylist/file/interface/slot/drag-drop-upload-file';

export function createDragDropFileUploadState(getProps: () => RecipeDragDropFileUpload) {
	const props = $derived(getProps());
	let files = $state<SlotDragDropUploadFile[]>([]);
	let isDragging = $state(false);
	let fileInputElement = $state<HTMLInputElement | null>(null);
	const multiple = $derived(props.multiple ?? false);
	const accept = $derived(props.accept ?? '');
	const maxSize = $derived(props.maxSize ?? 10 * 1024 * 1024);
	const disabled = $derived(props.disabled ?? false);
	const classes = $derived([props.class || ''].filter(Boolean).join(' '));

	const restProps = $derived.by(() => {
		const {
			multiple: _multiple,
			accept: _accept,
			maxSize: _maxSize,
			disabled: _disabled,
			class: _class,
			dropZoneClass,
			fileListClass,
			fileItemClass,
			buttonClass,
			preview,
			onFileSelect,
			onFileUpload,
			...rest
		} = props;

		return rest;
	});

	function updateFile(id: string, updates: Partial<SlotDragDropUploadFile>): void {
		files = files.map((file) => (file.id === id ? { ...file, ...updates } : file));
	}

	function processSelectedFiles(selectedFiles: FileList): void {
		props.onFileSelect?.(selectedFiles);

		for (let index = 0; index < selectedFiles.length; index += 1) {
			const file = selectedFiles[index];

			if (file.size > maxSize) {
				console.error(`File ${file.name} exceeds max size of ${maxSize} bytes`);
				continue;
			}

			const newFile: SlotDragDropUploadFile = {
				id: Math.random().toString(36).substring(2, 9),
				name: file.name,
				size: file.size,
				type: file.type,
				status: 'uploading',
				progress: 0
			};

			files = [...files, newFile];

			let progress = 0;
			const interval = setInterval(() => {
				progress += 10;

				if (progress >= 100) {
					clearInterval(interval);
					updateFile(newFile.id, { progress: 100, status: 'success' });
					props.onFileUpload?.(file);
					return;
				}

				updateFile(newFile.id, { progress });
			}, 200);
		}
	}

	function handleFileSelect(event: Event): void {
		DragDropFileUploadManager.handleFileSelect(event, processSelectedFiles);
	}

	function handleDrop(event: DragEvent): void {
		DragDropFileUploadManager.handleDrop(
			event,
			(value) => {
				isDragging = value;
			},
			processSelectedFiles
		);
	}

	function handleDragOver(event: DragEvent): void {
		event.preventDefault();
		isDragging = true;
	}

	function handleDragLeave(): void {
		isDragging = false;
	}

	function removeFile(id: string): void {
		files = DragDropFileUploadManager.removeFile(id, files);
	}

	function triggerFileInput(): void {
		if (!disabled) {
			fileInputElement?.click();
		}
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
		get multiple() {
			return multiple;
		},
		get accept() {
			return accept;
		},
		get maxSize() {
			return maxSize;
		},
		get files() {
			return files;
		},
		get isDragging() {
			return isDragging;
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
		get maxSizeLabel() {
			return DragDropFileUploadManager.formatFileSize(maxSize);
		},
		handleFileSelect,
		handleDrop,
		handleDragOver,
		handleDragLeave,
		removeFile,
		triggerFileInput
	};
}
