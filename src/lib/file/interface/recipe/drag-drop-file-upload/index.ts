import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeDragDropFileUpload
	extends ComputeIntersectAll<
		[
			{
				multiple?: boolean;
				accept?: string;
				maxSize?: number;
				disabled?: boolean;
				class?: string;
				dropZoneClass?: string;
				fileListClass?: string;
				fileItemClass?: string;
				buttonClass?: string;
				preview?: boolean;
				onFileSelect?: (files: FileList) => void;
				onFileUpload?: (file: File) => void;
				[key: string]: unknown;
			}
		]
	> {
	onFileSelect?: (files: FileList) => void;
	onFileUpload?: (file: File) => void;
}
