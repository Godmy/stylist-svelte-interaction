import type { UploadStatus } from '$stylist/file/type/alias/upload-status';
export interface SlotUploadFile {
	id: string;
	name: string;
	size: number;
	status: UploadStatus;
	progress: number;
	error?: string;
	uploadedAt?: Date;
	data?: unknown;
}
