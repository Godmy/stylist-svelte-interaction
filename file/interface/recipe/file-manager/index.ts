import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { BehaviorFileManager } from '$stylist/file/interface/behavior/file-manager';
import type { PresetFileManagerLabels } from '$stylist/file/const/preset/file-manager-labels';
import type { FileManagerEntry } from '$stylist/file/type/struct/file-manager-entry';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/** Folder browser: search, type facet, local upload metadata, rename and recursive delete. */
export interface RecipeFileManager extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlSection, 'children'>,
		BehaviorFileManager,
		{
			files?: FileManagerEntry[];
			labels?: Partial<Record<keyof typeof PresetFileManagerLabels, string>>;
		}
	]
> {}
