import type { SlotUploadFile } from '$stylist/file/interface/slot/upload-file';

export class UploadProgressManager {
	static handleRetry(file: SlotUploadFile, onRetry?: (file: SlotUploadFile) => void): void {
		onRetry?.(file);
	}

	static formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	static handleCancel(file: SlotUploadFile, onCancel?: (file: SlotUploadFile) => void): void {
		onCancel?.(file);
	}

	static handleRemove(file: SlotUploadFile, onRemove?: (file: SlotUploadFile) => void): void {
		onRemove?.(file);
	}
}
