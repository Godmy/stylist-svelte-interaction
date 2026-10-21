import DropZone from './index.svelte';
import type { RecipeDropZone } from '$stylist/file/interface/recipe/drop-zone';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** A drag-and-drop surface with optional previews and validation controls. */
export default {
	component: DropZone,
	title: 'DropZone',
	description: 'A drag-and-drop surface with optional previews and validation controls.',
	args: {
		accept: 'image/*,.pdf',
		multiple: true,
		disabled: false,
		preview: true,
		maxSize: 5 * 1024 * 1024,
		maxItems: 5,
		label: 'Drop files here',
		description: 'or click to browse'
	},
	controls: {
		accept: { type: 'text' },
		multiple: { type: 'boolean' },
		disabled: { type: 'boolean' },
		preview: { type: 'boolean' },
		maxSize: { type: 'number', min: 1024 },
		maxItems: { type: 'number', min: 1, max: 10 },
		label: { type: 'text' },
		description: { type: 'text' }
	}
} satisfies ContractStory<RecipeDropZone>;
