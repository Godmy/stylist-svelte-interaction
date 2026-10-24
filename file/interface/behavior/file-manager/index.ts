import type { FileManagerEntry } from '$stylist/file/type/struct/file-manager-entry';

/** Selecting a file reports a copy of its record; folders open instead. */
export interface BehaviorFileManager {
	onEntrySelect?: (entry: FileManagerEntry) => void;
}
