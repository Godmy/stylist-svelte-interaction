<script lang="ts">
	import MediaLibrary from '$stylist/file/component/organism/media-library/index.svelte';
	import type { RecipeMediaLibrary } from '$stylist/file/interface/recipe/media-library';
	import type { SlotMediaItem } from '$stylist/file/interface/slot/media-item';

	// Render of index.story.ts: every media item requires a Date `uploadDate`.
	let args: RecipeMediaLibrary = $props();

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

<MediaLibrary {...args} {items} />
