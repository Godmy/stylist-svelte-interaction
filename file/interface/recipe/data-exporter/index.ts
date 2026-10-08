import type { DataExporterFormat } from '$stylist/file/type/alias/data-exporter-format';
import type { SlotDataItem } from '$stylist/file/interface/slot/data-item';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

export interface RecipeDataExporter
	extends ComputeIntersectAll<
		[
			{
				data?: SlotDataItem[];
				format?: DataExporterFormat;
				disabled?: boolean;
				fileName?: string;
				class?: string;
				[key: string]: unknown;
			}
		]
	> {}
