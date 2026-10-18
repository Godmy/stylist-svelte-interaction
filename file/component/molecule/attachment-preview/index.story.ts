import AttachmentPreview from './index.svelte';
import type { RecipeAttachmentPreview } from '$stylist/file/interface/recipe/attachment-preview';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Compact file attachment row with file metadata and optional actions. */
export default {
	component: AttachmentPreview,
	title: 'AttachmentPreview',
	description: 'Compact file attachment row with file metadata and optional actions.',
	args: {
		attachment: { id: '1', name: 'project-brief.pdf', type: 'file', size: 2457600 },
		showActions: true
	},
	controls: { showActions: { type: 'boolean' } },
	presets: {
		Image: { attachment: { id: '2', name: 'wireframe-overview.png', type: 'image', size: 842000 } },
		Video: { attachment: { id: '3', name: 'demo-recording.mp4', type: 'video', size: 18432000 } },
		Audio: { attachment: { id: '4', name: 'interview.mp3', type: 'audio', size: 5120000 } }
	}
} satisfies ContractStory<RecipeAttachmentPreview>;
