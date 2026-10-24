import type { PresetFileManagerLabels } from '$stylist/file/const/preset/file-manager-labels';
import type { FileManagerEntry } from '$stylist/file/type/struct/file-manager-entry';

/** Entries (bindable, owned by the host) and label overrides. */
export interface SlotFileManager {
	files?: FileManagerEntry[];
	labels?: Partial<Record<keyof typeof PresetFileManagerLabels, string>>;
}
