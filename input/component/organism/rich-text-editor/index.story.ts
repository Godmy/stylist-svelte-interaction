import RichTextEditor from '$stylist/input/component/organism/rich-text-editor/index.svelte';
import type { RecipeRichTextEditor } from '$stylist/input/interface/recipe/rich-text-editor';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Contenteditable rich text editor with a formatting toolbar. */
export default {
	component: RichTextEditor,
	title: 'RichTextEditor',
	description:
		'Contenteditable rich text editor with a formatting toolbar (bold, italic, headings, lists, links, images).',
	args: {
		value: '<p>Hello, <strong>world</strong>!</p>',
		placeholder: 'Start writing here...',
		showToolbar: true
	},
	controls: { placeholder: { type: 'text' }, showToolbar: { type: 'boolean' } },
	presets: { Empty: { value: '' } }
} satisfies ContractStory<RecipeRichTextEditor>;
