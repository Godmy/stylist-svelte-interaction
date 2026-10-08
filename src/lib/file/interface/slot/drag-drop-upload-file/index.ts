export interface SlotDragDropUploadFile {
	id: string;
	name: string;
	size: number;
	type: string;
	status: 'uploading' | 'success' | 'error';
	progress: number;
	error?: string;
}
