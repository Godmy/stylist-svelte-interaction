<script lang="ts">
	import type { SlotMediaItem } from '$stylist/file/interface/slot/media-item';
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import MediaLibrary from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'allowUpload', type: 'boolean', defaultValue: true },
		{ name: 'allowDownload', type: 'boolean', defaultValue: true },
		{ name: 'allowDelete', type: 'boolean', defaultValue: true }
	];

	const items: SlotMediaItem[] = [
		{
			id: '1',
			url: 'https://via.placeholder.com/150',
			thumbnail: 'https://via.placeholder.com/150',
			type: 'image',
			name: 'Image 1',
			size: 102400,
			uploadDate: new Date()
		},
		{
			id: '2',
			url: 'https://via.placeholder.com/150',
			thumbnail: 'https://via.placeholder.com/150',
			type: 'image',
			name: 'Image 2',
			size: 204800,
			uploadDate: new Date()
		}
	];
</script>

<Story
	component={MediaLibrary}
	title="Media Library"
	description="Media library with upload and selection."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_c1">
			<MediaLibrary
				{items}
				allowUpload={values.allowUpload as boolean}
				allowDownload={values.allowDownload as boolean}
				allowDelete={values.allowDelete as boolean}
				onItemSelect={(item: SlotMediaItem) => console.log('Item selected:', item)}
				onItemDelete={(id: string) => console.log('Item deleted:', id)}
				onItemDownload={(id: string) => console.log('Item downloaded:', id)}
				onUpload={(files: FileList) => console.log('Files uploaded:', files.length)}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		height: 24rem;
	}
</style>
