import DocumentPreview from '$stylist/file/component/organism/document-preview/index.svelte';
import type { RecipeDocumentPreview } from '$stylist/file/interface/recipe/document-preview';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** A document preview component for displaying various document formats. */
export default {
	component: DocumentPreview,
	title: 'DocumentPreview',
	description: 'A document preview component for displaying and editing various document formats.',
	args: {
		title: 'Document Preview',
		format: 'json',
		content: JSON.stringify({ status: 'ok', data: { items: [1, 2, 3], total: 3 } }, null, 2)
	},
	controls: {
		title: { type: 'text' },
		// The formats SlotDocumentPreview accepts; no shared token matches them.
		format: { type: 'select', options: ['json', 'text', 'markdown'] },
		content: { type: 'text' }
	},
	presets: {
		Text: {
			format: 'text',
			content:
				'This is a plain text document.\n\nIt contains multiple lines of text.\n\nYou can use this component to preview any text content.'
		},
		Markdown: {
			format: 'markdown',
			content:
				'# Markdown Document\n\nThis is a **markdown** document.\n\n- Item 1\n- Item 2\n- Item 3\n'
		}
	}
} satisfies ContractStory<RecipeDocumentPreview>;
