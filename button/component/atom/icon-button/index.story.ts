import IconButton from './index.svelte';
import type { RecipeIconButton } from '$stylist/button/interface/recipe/icon-button';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Compact icon-only action button. */
export default {
	component: IconButton,
	title: 'IconButton',
	description:
		'Compact icon-only action button. Requires an `icon` (string name or Snippet); without one it renders as an empty box, so always pass one.',
	args: {
		variant: 'ghost',
		size: 'md',
		disabled: false,
		loading: false,
		ariaLabel: 'Open settings',
		icon: 'settings'
	},
	controls: {
		variant: {
			type: 'select',
			options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost']
		},
		// xs … xl: the size tokens the icon button styles.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 5) },
		disabled: { type: 'boolean' },
		loading: { type: 'boolean' },
		ariaLabel: { type: 'text', label: 'label' },
		icon: { type: 'select', options: ['settings', 'search', 'trash', 'x', 'check', 'plus'] }
	},
	presets: { Loading: { loading: true } },
	layout: 'centered'
} satisfies ContractStory<RecipeIconButton>;
