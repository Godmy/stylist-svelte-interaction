import IconToolbar from './index.svelte';
import type { RecipeIconToolbar } from '$stylist/control/interface/recipe/icon-toolbar';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_ORIENTATION } from '$stylist/layout/const/array/orientation';

/** Compact icon toolbar for domain and cluster pickers. */
export default {
	component: IconToolbar,
	title: 'IconToolbar',
	description: 'Compact icon toolbar for domain and cluster pickers.',
	args: {
		items: [{ name: 'select' }, { name: 'text' }, { name: 'comment' }],
		active: 'select',
		label: 'tool',
		orientation: TOKEN_ORIENTATION[0],
		showLabel: true
	},
	controls: {
		orientation: { type: 'select', options: TOKEN_ORIENTATION },
		showLabel: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeIconToolbar>;
