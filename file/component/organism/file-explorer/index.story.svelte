<script lang="ts">
	import FileExplorer from './index.svelte';
	import type { RecipeFileExplorer } from '$stylist/file/interface/recipe/file-explorer';
	import type { SlotFileSystemItem } from '$stylist/file/interface/slot/file-system-item';

	// Render of index.story.ts: the items carry Date `modified` values relative to now.
	let args: RecipeFileExplorer = $props();

	const day = 86400000;
	const items: SlotFileSystemItem[] = [
		{
			id: 'folder1',
			name: 'Documents',
			type: 'folder',
			size: 2048000,
			modified: new Date(Date.now() - day),
			children: []
		},
		{
			id: 'file1',
			name: 'report.pdf',
			type: 'file',
			size: 1028000,
			modified: new Date(Date.now() - 2 * day)
		},
		{
			id: 'file2',
			name: 'image.png',
			type: 'file',
			size: 3072000,
			modified: new Date(Date.now() - 3 * day)
		},
		{
			id: 'folder2',
			name: 'Projects',
			type: 'folder',
			size: 5120000,
			modified: new Date(Date.now() - 4 * day),
			children: []
		},
		{
			id: 'file3',
			name: 'presentation.pptx',
			type: 'file',
			size: 2048576,
			modified: new Date(Date.now() - 5 * day)
		},
		{
			id: 'file4',
			name: 'spreadsheet.xlsx',
			type: 'file',
			size: 1536000,
			modified: new Date(Date.now() - 6 * day)
		}
	];
</script>

<FileExplorer {...args} {items} />
