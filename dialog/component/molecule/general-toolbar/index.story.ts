import GeneralToolbar from './index.svelte';
import type { RecipeGeneralToolbar } from '$stylist/dialog/interface/recipe/general-toolbar';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Action strip; index.story.svelte supplies toolbarItems, whose action callbacks are not cloneable. */
export default {
	component: GeneralToolbar,
	title: 'GeneralToolbar',
	description: 'Compact action strip for canvas and editors.',
	args: {
		compact: false,
		disabled: false
	},
	controls: {
		compact: { type: 'boolean' },
		disabled: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeGeneralToolbar>;
