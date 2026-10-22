import Dialog from '$stylist/dialog/component/organism/dialog/index.svelte';
import type { RecipeDialog } from '$stylist/dialog/interface/recipe/dialog';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Overlay dialog; index.story.svelte opens it from a button and closes it through onClose. */
export default {
	component: Dialog,
	title: 'Dialog',
	description: 'A dialog component for user confirmations.',
	args: {
		open: false,
		title: 'Confirm action',
		description: 'Are you sure you want to continue?'
	},
	controls: {
		open: { type: 'boolean' },
		title: { type: 'text' },
		description: { type: 'text' }
	}
} satisfies ContractStory<RecipeDialog>;
