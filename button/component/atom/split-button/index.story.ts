import SplitButton from './index.svelte';
import type { RecipeSplitButton } from '$stylist/button/interface/recipe/split-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Primary action with a dropdown of secondary actions. */
export default {
	component: SplitButton,
	title: 'SplitButton',
	description:
		'Primary action button with a chevron toggle that opens a dropdown menu of secondary actions. Click the chevron to open the menu, or the main button to trigger the primary action.',
	args: { variant: 'primary', size: 'md', disabled: false, primaryLabel: 'Action' },
	controls: {
		variant: {
			type: 'select',
			options: ['primary', 'secondary', 'success', 'warning', 'danger', 'outline', 'ghost']
		},
		// xs … xl: the size tokens the split button styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 5) },
		disabled: { type: 'boolean' },
		primaryLabel: { type: 'text' }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeSplitButton>;
