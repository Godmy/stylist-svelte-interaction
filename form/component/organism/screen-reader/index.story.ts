import ScreenReader from './index.svelte';
import type { RecipeScreenReader } from '$stylist/form/interface/recipe/screen-reader';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Accessible title, text and action for assistive technology. */
export default {
	component: ScreenReader,
	title: 'ScreenReader',
	description:
		'A screen reader support component providing accessibility features and ARIA announcements.',
	args: {
		title: 'Accessibility notice',
		content: 'This section is announced to screen readers.'
	},
	controls: {
		title: { type: 'text' },
		content: { type: 'text' }
	},
	layout: 'padded'
} satisfies ContractStory<RecipeScreenReader>;
