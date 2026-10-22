import UploadProgress from '$stylist/file/component/organism/upload-progress/index.svelte';
import type { RecipeUploadProgress } from '$stylist/file/interface/recipe/upload-progress';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { UPLOAD_PROGRESS_VARIANT } from '$stylist/file/const/array/upload-progress-variant';

/** Progress indicator for file uploads with status management. */
export default {
	component: UploadProgress,
	title: 'UploadProgress',
	description: 'Progress indicator for file uploads with status management.',
	args: {
		files: [
			{ id: '1', name: 'document.pdf', size: 1024000, status: 'idle', progress: 0 },
			{ id: '2', name: 'image.jpg', size: 512000, status: 'uploading', progress: 45 },
			{ id: '3', name: 'presentation.pptx', size: 2048000, status: 'success', progress: 100 },
			{
				id: '4',
				name: 'video.mp4',
				size: 5120000,
				status: 'error',
				progress: 20,
				error: 'File too large'
			}
		],
		variant: 'default',
		showFileName: true,
		showFileSize: true,
		showProgress: true,
		showActions: true,
		autoHideCompleted: false,
		maxVisible: 5
	},
	controls: {
		variant: { type: 'select', options: UPLOAD_PROGRESS_VARIANT },
		showFileName: { type: 'boolean' },
		showFileSize: { type: 'boolean' },
		showProgress: { type: 'boolean' },
		showActions: { type: 'boolean' },
		autoHideCompleted: { type: 'boolean' },
		maxVisible: { type: 'number' }
	},
	presets: {
		Compact: { variant: 'compact' },
		Detailed: { variant: 'detailed' },
		'With Hidden Completed': { autoHideCompleted: true, maxVisible: 3 }
	}
} satisfies ContractStory<RecipeUploadProgress>;
