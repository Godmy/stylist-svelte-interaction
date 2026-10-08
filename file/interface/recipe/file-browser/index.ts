import type { SlotFolderItem } from '$stylist/file/interface/slot/folder-item';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeFileBrowser
	extends ComputeIntersectAll<
		[
			{
				items: SlotFolderItem[];
				class?: string;
				itemClass?: string;
				contentClass?: string;
				onItemSelect?: (item: SlotFolderItem) => void;
				onItemToggle?: (item: SlotFolderItem, expanded: boolean) => void;
				onItemAction?: (item: SlotFolderItem, action: string) => void;
				showItemCount?: boolean;
				enableSelection?: boolean;
				defaultExpanded?: boolean;
				disabled?: boolean;
				[key: string]: unknown;
			}
		]
	> {}
