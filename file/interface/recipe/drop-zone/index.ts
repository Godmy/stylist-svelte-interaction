import type { SlotDropItem } from '$stylist/file/interface/slot/drop-item';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeDropZone
	extends ComputeIntersectAll<
		[
			{
				class?: string;
				accept?: string;
				multiple?: boolean;
				disabled?: boolean;
				maxSize?: number;
				maxItems?: number;
				onDrop?: (items: SlotDropItem[]) => void;
				onDragOver?: (event: DragEvent) => void;
				onDragLeave?: (event: DragEvent) => void;
				onItemAdded?: (item: SlotDropItem) => void;
				onItemRemoved?: (item: SlotDropItem) => void;
				preview?: boolean;
				label?: string;
				description?: string;
			},
			SlotChildren
		]
	> {}
