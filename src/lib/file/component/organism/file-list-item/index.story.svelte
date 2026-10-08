<script lang="ts">
	import type { SlotFileItem } from '$stylist/file/interface/slot/file-item';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';

	import FileListItem from './index.svelte';

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

	const controls: SlotStory[] = [
		{ name: 'showThumbnail', type: 'boolean', defaultValue: false },
		{ name: 'showSize', type: 'boolean', defaultValue: true },
		{ name: 'showModified', type: 'boolean', defaultValue: true },
		{ name: 'showOwner', type: 'boolean', defaultValue: true },
		{ name: 'enableSelection', type: 'boolean', defaultValue: true },
		{ name: 'disabled', type: 'boolean', defaultValue: false },
		{ name: 'variant', type: 'select', defaultValue: 'default', options: ['default', 'compact'] }
	];
</script>

<Story
	component={FileListItem}
	title="FileListItem"
	description="Interactive file row with selection and actions."
	{controls}
>
	{#snippet children(args: any)}
		<div class="_c1">
			<FileListItem
				{item}
				showThumbnail={args.showThumbnail as boolean}
				showSize={args.showSize as boolean}
				showModified={args.showModified as boolean}
				showOwner={args.showOwner as boolean}
				enableSelection={args.enableSelection as boolean}
				disabled={args.disabled as boolean}
				variant={args.variant as 'default' | 'compact'}
				onItemSelect={(selectedItem: SlotFileItem) => {
					console.log('Selected item:', selectedItem.name);
				}}
				onItemDoubleClick={(selectedItem: SlotFileItem) => {
					console.log('Double clicked item:', selectedItem.name);
				}}
				onItemAction={(selectedItem: SlotFileItem, action: string) => {
					console.log('Item action:', { item: selectedItem.name, action });
				}}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		border-radius: 0.25rem;
		border-width: 1px;
		border-style: solid;
	}
</style>
