import ConfirmationDialog from './index.svelte';
import type { RecipeConfirmationDialog } from '$stylist/dialog/interface/recipe/confirmation-dialog';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Confirmation dialog; index.story.svelte opens it from a button and closes it on every action. */
export default {
	component: ConfirmationDialog,
	title: 'ConfirmationDialog',
	description: 'Interactive confirmation dialog with customizable options',
	args: {
		title: 'Confirm Action',
		message: 'Are you sure you want to perform this action?',
		confirmText: 'Confirm',
		cancelText: 'Cancel',
		variant: 'warning',
		size: 'md'
	},
	controls: {
		title: { type: 'text', description: 'Title of the dialog' },
		message: { type: 'text', description: 'Message content of the dialog' },
		confirmText: { type: 'text', description: 'Text for the confirm button' },
		cancelText: { type: 'text', description: 'Text for the cancel button' },
		variant: {
			type: 'select',
			options: TOKEN_COLOR_TONE,
			description: 'Visual variant of the dialog'
		},
		size: { type: 'select', options: TOKEN_SIZE.slice(1, 5), description: 'Size of the dialog' }
	}
} satisfies ContractStory<RecipeConfirmationDialog>;
