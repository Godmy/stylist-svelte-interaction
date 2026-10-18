import FileBrowser from './index.svelte';
import type { RecipeFileBrowser } from '$stylist/file/interface/recipe/file-browser';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Interactive folder tree with expandable folders and item counts. */
export default {
	component: FileBrowser,
	title: 'FileBrowser',
	description: 'Interactive file browser with customizable options.',
	args: {
		items: [
			{
				id: 'folder1',
				name: 'Documents',
				type: 'folder',
				children: [
					{
						id: 'folder1-1',
						name: 'Work',
						type: 'folder',
						children: [
							{ id: 'file1', name: 'report.pdf', type: 'file' },
							{ id: 'file2', name: 'presentation.pptx', type: 'file' },
							{ id: 'folder1-1-1', name: 'Archives', type: 'folder', children: [] }
						]
					},
					{
						id: 'folder1-2',
						name: 'Personal',
						type: 'folder',
						children: [
							{ id: 'file3', name: 'budget.xlsx', type: 'file' },
							{ id: 'file4', name: 'notes.txt', type: 'file' }
						]
					}
				]
			}
		],
		showItemCount: true,
		enableSelection: true,
		defaultExpanded: false,
		disabled: false
	},
	controls: {
		showItemCount: { type: 'boolean' },
		enableSelection: { type: 'boolean' },
		defaultExpanded: { type: 'boolean' },
		disabled: { type: 'boolean' }
	},
	presets: { Expanded: { defaultExpanded: true } }
} satisfies ContractStory<RecipeFileBrowser>;
