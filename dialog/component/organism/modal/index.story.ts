import Modal from './index.svelte';
import type { RecipeModal } from '$stylist/dialog/interface/recipe/modal';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Overlay dialog; index.story.svelte opens it from a button and closes it through onClose. */
export default {
	component: Modal,
	title: 'Modal',
	description: 'A modal dialog component.',
	args: {
		open: false,
		title: 'Modal Window'
	},
	controls: {
		open: { type: 'boolean' },
		title: { type: 'text' }
	}
} satisfies ContractStory<RecipeModal>;
