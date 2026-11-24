import { PresetFileManagerLabels } from '$stylist/file/const/preset/file-manager-labels';
import { fileKind } from '$stylist/file/function/resolve/file-kind';
import { fileManagerFilter } from '$stylist/file/function/transform/file-manager-filter';
import type { RecipeFileManager } from '$stylist/file/interface/recipe/file-manager';
import type { FileManagerEntry } from '$stylist/file/type/struct/file-manager-entry';
import { toSet } from '$stylist/theme/function/script/collection/to-set';
/** Reactive behavior of file-manager; props are read lazily when needed. */
export function createFileManagerComponentState(
	getProps: () => Pick<RecipeFileManager, 'files' | 'labels' | 'onEntrySelect'> & {
		files: Exclude<RecipeFileManager['files'], undefined>;
	}
) {
	const props = $derived(getProps());
	const text = $derived({ ...PresetFileManagerLabels, ...props['labels'] });
	let parent = $state<string | null>(null);
	let query = $state('');
	let kind = $state('');
	let view = $state('grid');
	let selected = $state<string[]>([]);
	let renameId = $state('');
	let newName = $state('');
	let folderName = $state('');
	let serial = $state(1);
	let notice = $state('');
	let deleting = $state(false);
	const visible = $derived(fileManagerFilter(props['files'], parent, query, kind));
	const folder = $derived(props['files'].find((entry) => entry.id === parent));
	const total = $derived(props['files'].reduce((sum, entry) => sum + entry.size, 0));
	function today(): string {
		return new Date().toISOString().slice(0, 10);
	}
	function goRoot() {
		parent = null;
		query = '';
		selected = [];
	}
	function open(entry: FileManagerEntry) {
		if (entry.kind === 'folder') {
			parent = entry.id;
			query = '';
			selected = [];
		} else {
			selected = [entry.id];
			props['onEntrySelect']?.({ ...entry });
		}
	}
	function toggle(id: string, checked: boolean) {
		selected = checked ? [...selected, id] : selected.filter((item) => item !== id);
	}
	// Only metadata is kept; file contents never leave the input.
	function upload(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const batch = Array.from(input.files ?? []);
		props['files'] = [
			...props['files'],
			...batch.map((file) => ({
				id: `upload-${serial++}`,
				name: file.name,
				parentId: parent,
				kind: fileKind(file.name),
				size: file.size,
				modified: today()
			}))
		];
		notice = `${text.uploaded}: ${batch.length}`;
		input.value = '';
	}
	function createFolder(event: SubmitEvent) {
		event.preventDefault();
		if (!folderName.trim()) return;
		props['files'] = [
			...props['files'],
			{
				id: `folder-${serial++}`,
				name: folderName.trim(),
				parentId: parent,
				kind: 'folder',
				size: 0,
				modified: today()
			}
		];
		folderName = '';
	}
	// Deleting a folder removes its whole subtree.
	function remove() {
		let ids = toSet(selected);
		for (let previous = -1; previous !== ids.size;) {
			previous = ids.size;
			const current = ids;
			const children = props['files'].filter(
				(entry) => entry.parentId && current.has(entry.parentId)
			);
			ids = toSet([...current, ...children.map((entry) => entry.id)]);
		}
		props['files'] = props['files'].filter((entry) => !ids.has(entry.id));
		selected = [];
		deleting = false;
	}
	function rename(event: SubmitEvent) {
		event.preventDefault();
		if (!newName.trim()) return;
		props['files'] = props['files'].map((entry) =>
			entry.id === renameId ? { ...entry, name: newName.trim() } : entry
		);
		renameId = '';
		newName = '';
	}
	return {
		get text(): typeof text {
			return text;
		},
		get query(): typeof query {
			return query;
		},
		set query(__nextValue: typeof query) {
			query = __nextValue;
		},
		get kind(): typeof kind {
			return kind;
		},
		set kind(__nextValue: typeof kind) {
			kind = __nextValue;
		},
		get view(): typeof view {
			return view;
		},
		set view(__nextValue: typeof view) {
			view = __nextValue;
		},
		get selected(): typeof selected {
			return selected;
		},
		set selected(__nextValue: typeof selected) {
			selected = __nextValue;
		},
		get renameId(): typeof renameId {
			return renameId;
		},
		set renameId(__nextValue: typeof renameId) {
			renameId = __nextValue;
		},
		get newName(): typeof newName {
			return newName;
		},
		set newName(__nextValue: typeof newName) {
			newName = __nextValue;
		},
		get folderName(): typeof folderName {
			return folderName;
		},
		set folderName(__nextValue: typeof folderName) {
			folderName = __nextValue;
		},
		get notice(): typeof notice {
			return notice;
		},
		set notice(__nextValue: typeof notice) {
			notice = __nextValue;
		},
		get deleting(): typeof deleting {
			return deleting;
		},
		set deleting(__nextValue: typeof deleting) {
			deleting = __nextValue;
		},
		get visible(): typeof visible {
			return visible;
		},
		get folder(): typeof folder {
			return folder;
		},
		get total(): typeof total {
			return total;
		},
		get goRoot(): typeof goRoot {
			return goRoot;
		},
		get open(): typeof open {
			return open;
		},
		get toggle(): typeof toggle {
			return toggle;
		},
		get upload(): typeof upload {
			return upload;
		},
		get createFolder(): typeof createFolder {
			return createFolder;
		},
		get remove(): typeof remove {
			return remove;
		},
		get rename(): typeof rename {
			return rename;
		}
	};
}
export default createFileManagerComponentState;
