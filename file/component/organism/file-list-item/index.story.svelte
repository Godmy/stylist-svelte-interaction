<script lang="ts">
	import FileListItem from '$stylist/file/component/organism/file-list-item/index.svelte';
	import type { RecipeFileListItem } from '$stylist/file/interface/recipe/file-list-item';
	import type { SlotFileItem } from '$stylist/file/interface/slot/file-item';

	// Render of index.story.ts: the item carries Date `modified`/`created` values relative to now.
	let args: RecipeFileListItem = $props();

	const item: SlotFileItem = {
		id: 'file1',
		name: 'document.pdf',
		type: 'file',
		size: 1028000,
		modified: new Date(Date.now() - 86400000),
		created: new Date(Date.now() - 172800000),
		path: '/documents/file.pdf',
		owner: 'john.doe',
		selected: false
	};
</script>

<FileListItem {...args} {item} />
