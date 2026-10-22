import Spinner from '$stylist/animation/component/atom/spinner/index.svelte';
import type { RecipeSpinner } from '$stylist/animation/interface/recipe/spinner';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Indeterminate loading indicator. */
export default {
	component: Spinner,
	title: 'Spinner',
	description: 'Indeterminate loading indicator.',
	args: { size: 'md', label: 'Loading' },
	controls: {
		// The spinner styles only sm, md and lg.
		size: { type: 'select', options: TOKEN_SIZE.slice(1, 4) },
		label: { type: 'text' }
	},
	presets: {
		Small: { size: 'sm' },
		Large: { size: 'lg' }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeSpinner>;
