import MediaLibrary from './index.svelte';
import type { RecipeMediaLibrary } from '$stylist/file/interface/recipe/media-library';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { FILE_EXPLORER_VIEW_MODE } from '$stylist/file/const/array/file-explorer-view-mode';

/** Media library; index.story.svelte supplies the items with their Date `uploadDate`. */
export default {
	component: MediaLibrary,
	title: 'MediaLibrary',
	description: 'Media library with upload and selection.',
	args: {
		allowUpload: true,
		allowDownload: true,
		allowDelete: true,
		viewMode: 'grid',
		searchPlaceholder: 'Search media...'
	},
	controls: {
		allowUpload: { type: 'boolean' },
		allowDownload: { type: 'boolean' },
		allowDelete: { type: 'boolean' },
		viewMode: { type: 'select', options: FILE_EXPLORER_VIEW_MODE },
		searchPlaceholder: { type: 'text' }
	},
	presets: { List: { viewMode: 'list' }, 'Read only': { allowUpload: false, allowDelete: false } }
} satisfies ContractStory<RecipeMediaLibrary>;
