import type { SlotDragDropUploadFile } from '$stylist/file/interface/slot/drag-drop-upload-file';

export class DragDropFileUploadManager {
	static handleFileSelect(event: Event, processFiles: (files: FileList) => void): void {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) processFiles(target.files);
	}

	static formatFileSize(bytes: number): string {
		if (bytes < 1024) return bytes + ' bytes';
		if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
		return (bytes / 1048576).toFixed(1) + ' MB';
	}

	static handleDrop(
		event: DragEvent,
		setIsDragging: (value: boolean) => void,
		processFiles: (files: FileList) => void
	): void {
		event.preventDefault();
		setIsDragging(false);
		if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
			processFiles(event.dataTransfer.files);
		}
	}

	static processFiles(
		selectedFiles: FileList,
		files: SlotDragDropUploadFile[],
		maxSize: number,
		onFileSelect?: (files: FileList) => void,
		simulateUpload?: (
			fileId: string,
			file: File,
			updateProgress: (id: string, updates: Partial<SlotDragDropUploadFile>) => void,
			onFileUpload?: (file: File) => void
		) => void,
		onFileUpload?: (file: File) => void
	): SlotDragDropUploadFile[] {
		onFileSelect?.(selectedFiles);
		const newFiles: SlotDragDropUploadFile[] = [...files];
		for (let i = 0; i < selectedFiles.length; i++) {
			const file = selectedFiles[i];
			if (file.size > maxSize) continue;
			const newFile: SlotDragDropUploadFile = {
				id: Math.random().toString(36).substring(2, 9),
				name: file.name,
				size: file.size,
				type: file.type,
				status: 'uploading',
				progress: 0
			};
			newFiles.push(newFile);
			simulateUpload?.(newFile.id, file, () => {}, onFileUpload);
		}
		return newFiles;
	}

	static removeFile(id: string, files: SlotDragDropUploadFile[]): SlotDragDropUploadFile[] {
		return files.filter((file) => file.id !== id);
	}

	static simulateUpload(
		fileId: string,
		file: File,
		updateFile: (id: string, updates: Partial<SlotDragDropUploadFile>) => void,
		onFileUpload?: (file: File) => void
	): void {
		void file;
		void onFileUpload;
		setInterval(() => {
			updateFile(fileId, { progress: Math.min(100, Math.random() * 100) });
		}, 200);
	}
}
