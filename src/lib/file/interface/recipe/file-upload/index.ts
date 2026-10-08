import type { HTMLAttributes } from 'svelte/elements';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { UploadStatus } from '$stylist/file/type/alias/upload-status';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
export interface RecipeFileUpload
	extends ComputeIntersectAll<
		[
			{
				accept?: string;
				maxSize?: number;
				multiple?: boolean;
				status?: UploadStatus;
				file?: File | null;
				onFileSelect?: (file: File | FileList | null) => void;
				onUpload?: (file: File) => Promise<void>;
				disabled?: boolean;
				uploadText?: string;
				class?: string;
				[key: string]: unknown;
			},
			SlotChildren,
			HTMLAttributes<HTMLDivElement>
		]
	> {
	onFileSelect?: (file: File | FileList | null) => void;
	onUpload?: (file: File) => Promise<void>;

	accept?: string;
	maxSize?: number;
	multiple?: boolean;
	status?: UploadStatus;
	file?: File | null;
	disabled?: boolean;
	uploadText?: string;
	class?: string;
}
