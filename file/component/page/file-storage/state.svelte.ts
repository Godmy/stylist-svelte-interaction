import { FILE_MANAGER_SAMPLE } from '$stylist/file/const/array/file-manager-sample';

import type { FileManagerEntry } from '$stylist/file/type/struct/file-manager-entry';
/** Reactive behavior of file-storage; props are read lazily when needed. */
export function createFileStorageComponentState() {
	let files = $state<FileManagerEntry[]>(FILE_MANAGER_SAMPLE.map((entry) => ({ ...entry })));
	let selectedId = $state('');
	// The page owns the records, so a deleted selection disappears from the details.
	const selected = $derived(files.find((entry) => entry.id === selectedId));
	return {
		get files(): typeof files {
			return files;
		},
		set files(__nextValue: typeof files) {
			files = __nextValue;
		},
		get selectedId(): typeof selectedId {
			return selectedId;
		},
		set selectedId(__nextValue: typeof selectedId) {
			selectedId = __nextValue;
		},
		get selected(): typeof selected {
			return selected;
		}
	};
}
export default createFileStorageComponentState;
