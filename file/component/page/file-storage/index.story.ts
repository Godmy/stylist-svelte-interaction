import FileStorage from '$stylist/file/component/page/file-storage/index.svelte';
import type { RecipeFileStorage } from '$stylist/file/interface/recipe/file-storage';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Storage page with Russian labels; the selected file details follow deletions. */
export default {
	component: FileStorage,
	title: 'FileStorage',
	description: 'Shared storage page built on FileManager.',
	args: { title: 'Общее хранилище' },
	controls: { title: { type: 'text' } },
	layout: 'padded'
} satisfies ContractStory<RecipeFileStorage>;
