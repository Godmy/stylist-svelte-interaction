import InputLabel from './index.svelte';
import type { RecipeInputLabel } from '$stylist/input/interface/recipe/input-label';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Label with an optional required-indicator. */
export default {
	component: InputLabel,
	title: 'InputLabel',
	description: 'Label with an optional required-indicator, shared across the input field family.',
	args: {
		id: 'story-input-label',
		label: 'Work email',
		required: true,
		disabled: false,
		size: 'md'
	},
	controls: {
		label: { type: 'text' },
		required: { type: 'boolean' },
		disabled: { type: 'boolean' },
		// xs … 2xl: the size scale of the input family.
		size: { type: 'select', options: TOKEN_SIZE.slice(0, 6) }
	}
} satisfies ContractStory<RecipeInputLabel>;
