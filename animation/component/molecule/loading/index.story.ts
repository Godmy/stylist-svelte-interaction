import Loading from '$stylist/animation/component/molecule/loading/index.svelte';
import type { RecipeLoading } from '$stylist/animation/interface/recipe/loading';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Polished loading state with spinner, label, and progress shimmer. */
export default {
	component: Loading,
	title: 'Loading',
	description: 'Polished loading state with spinner, label, and progress shimmer.',
	args: { loading: true, label: 'Preparing your workspace', size: 'md' },
	controls: {
		loading: { type: 'boolean' },
		label: { type: 'text' },
		// The loading state styles only sm, md and lg.
		size: { type: 'select', options: TOKEN_SIZE.slice(1, 4) }
	}
} satisfies ContractStory<RecipeLoading>;
