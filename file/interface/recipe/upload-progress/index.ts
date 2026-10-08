import type { SlotUploadProgress } from '$stylist/file/interface/slot/upload-progress';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeUploadProgress
	extends ComputeIntersectAll<[SlotUploadProgress, { class?: string }]> {}
