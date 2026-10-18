import RichTextFormatToolbar from './index.svelte';
import type { RecipeRichTextFormatToolbar } from '$stylist/input/interface/recipe/rich-text-format-toolbar';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Word-like rich text formatting toolbar. */
export default {
	component: RichTextFormatToolbar,
	title: 'RichTextFormatToolbar',
	description:
		'Word-like rich text formatting toolbar with style, font, size, color, alignment, list, link, and image controls.',
	args: { showLinkInput: false, linkUrl: 'https://example.com' },
	controls: { showLinkInput: { type: 'boolean' }, linkUrl: { type: 'text' } },
	presets: { 'Link input': { showLinkInput: true } }
} satisfies ContractStory<RecipeRichTextFormatToolbar>;
