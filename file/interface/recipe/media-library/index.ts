import type { HTMLAttributes } from 'svelte/elements';
import type { SlotMediaItem } from '$stylist/file/interface/slot/media-item';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeMediaLibrary
	extends ComputeIntersectAll<
		[
			Omit<HTMLAttributes<HTMLDivElement>, 'class'>,
			{
				items: SlotMediaItem[];
				onItemSelect?: (item: SlotMediaItem) => void;
				onItemDelete?: (id: string) => void;
				onItemDownload?: (id: string) => void;
				onUpload?: (files: FileList) => void;
				viewMode?: 'grid' | 'list';
				allowDelete?: boolean;
				allowDownload?: boolean;
				allowUpload?: boolean;
				searchPlaceholder?: string;
				class?: string;
				headerClass?: string;
				toolbarClass?: string;
				gridClass?: string;
				itemClass?: string;
			}
		]
	> {}
