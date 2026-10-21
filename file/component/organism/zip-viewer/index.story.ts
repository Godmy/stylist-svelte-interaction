import ZipViewer from './index.svelte';
import type { RecipeZipViewer } from '$stylist/file/interface/recipe/zip-viewer';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Archive browser; index.story.svelte supplies the entries with their Date `modified`. */
export default {
	component: ZipViewer,
	title: 'ZipViewer',
	description:
		'Inspect the contents of backup archives, crash bundles, or exported design systems.',
	args: {
		archiveName: 'design-system.zip',
		searchable: true,
		showPath: true,
		enableFiltering: true,
		defaultExpanded: true,
		disabled: false
	},
	controls: {
		archiveName: { type: 'text' },
		searchable: { type: 'boolean' },
		showPath: { type: 'boolean' },
		enableFiltering: { type: 'boolean' },
		defaultExpanded: { type: 'boolean' },
		disabled: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeZipViewer>;
