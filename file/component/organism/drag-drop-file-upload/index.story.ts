import DragDropFileUpload from '$stylist/file/component/organism/drag-drop-file-upload/index.svelte';
import type { RecipeDragDropFileUpload } from '$stylist/file/interface/recipe/drag-drop-file-upload';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** A component for drag and drop file uploads. */
export default {
	component: DragDropFileUpload,
	title: 'DragDropFileUpload',
	description: 'A component for drag and drop file uploads.',
	args: { accept: '*', multiple: false, disabled: false, maxSize: 10485760, preview: false },
	controls: {
		accept: { type: 'text' },
		multiple: { type: 'boolean' },
		disabled: { type: 'boolean' },
		maxSize: { type: 'number', description: 'Maximum file size in bytes (10MB)' },
		preview: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeDragDropFileUpload>;
