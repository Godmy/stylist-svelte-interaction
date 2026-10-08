import { createEventDispatcher } from 'svelte';
import type { SlotAttachment } from '$stylist/file/interface/slot/attachment';

export class AttachmentPreviewManager {
	static createDispatch() {
		return createEventDispatcher<{
			remove: { attachment: SlotAttachment };
			download: { attachment: SlotAttachment };
		}>();
	}

	static formatFileSize(bytes?: number): string {
		if (!bytes) return '';
		if (bytes < 1024) return bytes + ' B';
		if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
		return (bytes / 1048576).toFixed(1) + ' MB';
	}

	static getIconName(type: string): string {
		switch (type) {
			case 'image':
			case 'video':
			case 'audio':
			case 'file':
				return type;
			default:
				return 'file';
		}
	}

	static handleDownload(
		dispatch: ReturnType<typeof AttachmentPreviewManager.createDispatch>,
		attachment: SlotAttachment
	): void {
		dispatch('download', { attachment });
	}

	static handleRemove(
		dispatch: ReturnType<typeof AttachmentPreviewManager.createDispatch>,
		attachment: SlotAttachment
	): void {
		dispatch('remove', { attachment });
	}
}
