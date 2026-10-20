import SimpleModal from './index.svelte';
import type { RecipeSimpleModal } from '$stylist/dialog/interface/recipe/simple-modal';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Overlay dialog; index.story.svelte opens it from a button and closes it through onClose. */
export default {
	component: SimpleModal,
	title: 'Simple Modal',
	description: 'A simple modal dialog component.',
	args: {
		open: false,
		title: 'Notice'
	},
	controls: {
		open: { type: 'boolean' },
		title: { type: 'text' }
	}
} satisfies ContractStory<RecipeSimpleModal>;
