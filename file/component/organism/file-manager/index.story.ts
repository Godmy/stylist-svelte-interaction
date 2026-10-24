import FileManager from '$stylist/file/component/organism/file-manager/index.svelte';
import type { RecipeFileManager } from '$stylist/file/interface/recipe/file-manager';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { FILE_MANAGER_SAMPLE } from '$stylist/file/const/array/file-manager-sample';

/** Sample folders and files; uploads keep only metadata and nothing reaches a server. */
export default {
	component: FileManager,
	title: 'FileManager',
	description: 'Folders, search, type facet, upload metadata, rename and recursive delete.',
	args: { files: FILE_MANAGER_SAMPLE.map((entry) => ({ ...entry })) },
	presets: { Empty: { files: [] } },
	layout: 'padded'
} satisfies ContractStory<RecipeFileManager>;
