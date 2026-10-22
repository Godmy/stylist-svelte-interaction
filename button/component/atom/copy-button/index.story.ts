import CopyButton from '$stylist/button/component/atom/copy-button/index.svelte';
import type { RecipeCopyButton } from '$stylist/button/interface/recipe/copy-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Copies `copyText` to the clipboard and confirms with a checkmark. */
export default {
	component: CopyButton,
	title: 'CopyButton',
	description:
		"Copies the text passed via `copyText` to the clipboard when clicked. The icon and label switch to a checkmark and 'Copied!' for 2 seconds as confirmation, then revert automatically. Typically placed next to a code snippet, API key, or link that the user needs to paste elsewhere.",
	args: {
		copyText: 'npm install stylist-svelte',
		text: 'Copy command',
		showIcon: true,
		variant: 'outline',
		size: 'md',
		disabled: false
	},
	controls: {
		copyText: { type: 'text' },
		text: { type: 'text' },
		showIcon: { type: 'boolean' },
		variant: {
			type: 'select',
			options: ['primary', 'secondary', 'success', 'warning', 'danger', 'outline', 'ghost']
		},
		// xs … xl: the size tokens the copy button styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 5) },
		disabled: { type: 'boolean' }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeCopyButton>;
