import FileExplorer from '$stylist/file/component/organism/file-explorer/index.svelte';
import type { RecipeFileExplorer } from '$stylist/file/interface/recipe/file-explorer';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { FILE_EXPLORER_VIEW_MODE } from '$stylist/file/const/array/file-explorer-view-mode';

/** File explorer; index.story.svelte supplies the items with their Date metadata. */
export default {
	component: FileExplorer,
	title: 'FileExplorer',
	description: 'File explorer component with grid/list views, search and selection capabilities.',
	args: {
		currentPath: '/home/user',
		viewMode: 'grid',
		searchable: true,
		showPath: true,
		enableSelection: true,
		multiselect: false
	},
	controls: {
		currentPath: { type: 'text' },
		viewMode: { type: 'select', options: FILE_EXPLORER_VIEW_MODE },
		searchable: { type: 'boolean' },
		showPath: { type: 'boolean' },
		enableSelection: { type: 'boolean' },
		multiselect: { type: 'boolean' }
	},
	presets: {
		'List View': { viewMode: 'list', currentPath: '/documents' },
		'Grid View (No Search)': { viewMode: 'grid', currentPath: '/projects', searchable: false }
	}
} satisfies ContractStory<RecipeFileExplorer>;
