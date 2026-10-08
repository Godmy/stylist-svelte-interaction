import type { SlotZipEntry } from '$stylist/file/interface/slot/zip-entry';
import type { SlotChildren } from '$stylist/theme/interface/slot/children';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeZipViewer
	extends ComputeIntersectAll<
		[
			{
				entries: SlotZipEntry[];
				archiveName?: string;
				class?: string;
				entryClass?: string;
				headerClass?: string;
				onEntryClick?: (entry: SlotZipEntry) => void;
				onEntryPreview?: (entry: SlotZipEntry) => void;
				onEntryDownload?: (entry: SlotZipEntry) => void;
				onEntryExtract?: (entry: SlotZipEntry) => void;
				searchable?: boolean;
				showPath?: boolean;
				enableFiltering?: boolean;
				defaultExpanded?: boolean;
				disabled?: boolean;
				[key: string]: unknown;
			},
			SlotChildren
		]
	> {}
