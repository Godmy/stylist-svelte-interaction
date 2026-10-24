import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { BehaviorFileManager } from '$stylist/file/interface/behavior/file-manager';
import type { SlotFileManager } from '$stylist/file/interface/slot/file-manager';

/** Folder browser: search, type facet, local upload metadata, rename and recursive delete. */
export interface RecipeFileManager
	extends Omit<RecipeHtmlSection, 'children'>, BehaviorFileManager, SlotFileManager {}
