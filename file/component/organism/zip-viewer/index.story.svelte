<script lang="ts">
	import ZipViewer from './index.svelte';
	import type { RecipeZipViewer } from '$stylist/file/interface/recipe/zip-viewer';
	import type { SlotZipEntry } from '$stylist/file/interface/slot/zip-entry';

	// Render of index.story.ts: the file entries carry Date `modified` values.
	let args: RecipeZipViewer = $props();

	const entries: SlotZipEntry[] = [
		{ id: '1', name: 'design-system/', type: 'directory', path: 'design-system/' },
		{
			id: '2',
			name: 'components/',
			type: 'directory',
			path: 'design-system/components/',
			parentPath: 'design-system/'
		},
		{
			id: '3',
			name: 'Button.svelte',
			type: 'file',
			path: 'design-system/components/Button.svelte',
			parentPath: 'design-system/components/',
			size: 3420,
			isText: true,
			modified: new Date()
		},
		{
			id: '4',
			name: 'Select.svelte',
			type: 'file',
			path: 'design-system/components/Select.svelte',
			parentPath: 'design-system/components/',
			size: 4192,
			isText: true,
			modified: new Date()
		},
		{
			id: '5',
			name: 'tokens/',
			type: 'directory',
			path: 'design-system/tokens/',
			parentPath: 'design-system/'
		},
		{
			id: '6',
			name: 'colors.json',
			type: 'file',
			path: 'design-system/tokens/colors.json',
			parentPath: 'design-system/tokens/',
			size: 1820,
			isText: true,
			modified: new Date()
		},
		{
			id: '7',
			name: 'README.md',
			type: 'file',
			path: 'README.md',
			size: 1096,
			isText: true,
			modified: new Date()
		}
	];
</script>

<ZipViewer {...args} {entries} />
