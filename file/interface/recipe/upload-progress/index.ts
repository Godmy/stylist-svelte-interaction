import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';
import type { SlotUploadFile } from '$stylist/file/interface/slot/upload-file';
import type { UploadProgressVariant } from '$stylist/file/type/alias/upload-progress-variant';

export interface RecipeUploadProgress extends ComputeIntersectAll<
	[
		{
			files: SlotUploadFile[];
			variant?: UploadProgressVariant;
			hostClass?: string;
			itemClass?: string;
			progressClass?: string;
			showFileName?: boolean;
			showFileSize?: boolean;
			showProgress?: boolean;
			showActions?: boolean;
			onRetry?: (file: SlotUploadFile) => void;
			onCancel?: (file: SlotUploadFile) => void;
			onRemove?: (file: SlotUploadFile) => void;
			autoHideCompleted?: boolean;
			maxVisible?: number;
			[key: string]: unknown;
		},
		{ class?: string }
	]
> {}
