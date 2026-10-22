import DialogConfirm from '$stylist/dialog/component/molecule/dialog-confirm/index.svelte';
import type { RecipeDialogConfirm } from '$stylist/dialog/interface/recipe/dialog-confirm';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';

/** Confirm dialog; index.story.svelte supplies the required onClose/onConfirm and a reopen button. */
export default {
	component: DialogConfirm,
	title: 'DialogConfirm',
	description: 'A confirmation dialog component with different variants',
	args: {
		isOpen: false,
		title: 'Delete Item',
		message: 'Are you sure you want to delete this item? This action cannot be undone.',
		confirmText: 'Delete',
		cancelText: 'Cancel',
		variant: 'danger',
		isLoading: false
	},
	controls: {
		isOpen: { type: 'boolean', description: 'Whether the dialog is open' },
		title: { type: 'text', description: 'Title of the dialog' },
		message: { type: 'text', description: 'Message content of the dialog' },
		confirmText: { type: 'text', description: 'Text for the confirm button' },
		cancelText: { type: 'text', description: 'Text for the cancel button' },
		variant: {
			type: 'select',
			// info, warning, danger: the tones the recipe accepts.
			options: TOKEN_COLOR_TONE.slice(6, 9),
			description: 'Visual variant of the dialog'
		},
		isLoading: { type: 'boolean', description: 'Whether the dialog is in loading state' }
	}
} satisfies ContractStory<RecipeDialogConfirm>;
