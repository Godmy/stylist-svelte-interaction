import type { SlotFileItem } from '$stylist/file/interface/slot/file-item';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeFileListItem
	extends ComputeIntersectAll<
		[
			{
				item: SlotFileItem;
				class?: string;
				cellClass?: string;
				onItemSelect?: (item: SlotFileItem) => void;
				onItemDoubleClick?: (item: SlotFileItem) => void;
				onItemAction?: (item: SlotFileItem, action: string) => void;
				showThumbnail?: boolean;
				showSize?: boolean;
				showModified?: boolean;
				showOwner?: boolean;
				enableSelection?: boolean;
				disabled?: boolean;
				variant?: 'default' | 'compact';
				[key: string]: unknown;
			}
		]
	> {}
