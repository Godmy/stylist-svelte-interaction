import CloseButton from './index.svelte';
import type { RecipeCloseButton } from '$stylist/button/interface/recipe/close-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Icon-only dismiss button. */
export default {
	component: CloseButton,
	title: 'CloseButton',
	description:
		'Small icon-only button for dismiss actions, e.g. closing a modal, dialog, or toast.',
	args: { size: 'md', variant: 'ghost', disabled: false, loading: false, 'aria-label': 'Close' },
	controls: {
		// xs … 2xl: the size tokens the close button styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 6) },
		variant: { type: 'select', options: ['default', 'ghost'] },
		disabled: { type: 'boolean' },
		loading: { type: 'boolean' }
	},
	presets: { Loading: { loading: true } },
	layout: 'centered'
} satisfies ContractStory<RecipeCloseButton>;
