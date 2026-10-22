import FileUpload from '$stylist/file/component/molecule/file-upload/index.svelte';
import type { RecipeFileUpload } from '$stylist/file/interface/recipe/file-upload';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** File upload component with drag and drop support. */
export default {
	component: FileUpload,
	title: 'FileUpload',
	description: 'File upload component with drag and drop support.',
	args: {
		accept: '.pdf,.doc,.docx,.xls,.xlsx,.txt',
		maxSize: 10485760,
		multiple: false,
		disabled: false,
		uploadText: 'or drag and drop here'
	},
	controls: {
		accept: { type: 'text', description: 'Accepted file types' },
		maxSize: { type: 'number', description: 'Maximum file size in bytes (10MB)' },
		multiple: { type: 'boolean', description: 'Whether to allow multiple files' },
		disabled: { type: 'boolean', description: 'Whether the upload is disabled' },
		uploadText: { type: 'text' }
	}
} satisfies ContractStory<RecipeFileUpload>;
