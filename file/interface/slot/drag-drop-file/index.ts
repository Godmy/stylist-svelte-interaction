export interface SlotDragDropFile {
	id: string;
	name: string;
	size: number;
	type: string;
	status: 'idle' | 'uploading' | 'success' | 'error';
	progress?: number;
}
