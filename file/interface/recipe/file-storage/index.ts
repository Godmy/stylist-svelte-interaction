import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { SlotFileStorage } from '$stylist/file/interface/slot/file-storage';

/** Shared storage page: the file manager and the selected file details; nothing is uploaded. */
export interface RecipeFileStorage extends Omit<RecipeHtmlSection, 'children' | 'title'>, SlotFileStorage {}
