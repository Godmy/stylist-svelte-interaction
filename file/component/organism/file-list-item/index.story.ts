import FileListItem from '$stylist/file/component/organism/file-list-item/index.svelte';
import type { RecipeFileListItem } from '$stylist/file/interface/recipe/file-list-item';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Interactive file row; index.story.svelte supplies the item with its Date metadata. */
export default {
	component: FileListItem,
	title: 'FileListItem',
	description: 'Interactive file row with selection and actions.',
	args: {
		showThumbnail: false,
		showSize: true,
		showModified: true,
		showOwner: true,
		enableSelection: true,
		disabled: false,
		variant: 'default'
	},
	controls: {
		showThumbnail: { type: 'boolean' },
		showSize: { type: 'boolean' },
		showModified: { type: 'boolean' },
		showOwner: { type: 'boolean' },
		enableSelection: { type: 'boolean' },
		disabled: { type: 'boolean' },
		// The row variants of RecipeFileListItem; no shared token matches them.
		variant: { type: 'select', options: ['default', 'compact'] }
	},
	presets: { Compact: { variant: 'compact' } }
} satisfies ContractStory<RecipeFileListItem>;
