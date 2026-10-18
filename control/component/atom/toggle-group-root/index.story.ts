import ToggleGroupRoot from './index.svelte';
import type { RecipeToggleGroupRoot } from '$stylist/control/interface/recipe/toggle-group-root';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_SELECTION_TYPE } from '$stylist/control/const/array/selection-type';

/** Context provider that coordinates single or multiple toggle selection. */
export default {
	component: ToggleGroupRoot,
	title: 'ToggleGroupRoot',
	description: 'Context provider that coordinates single or multiple toggle selection.',
	args: { type: 'single', disabled: false },
	controls: {
		type: { type: 'select', options: TOKEN_SELECTION_TYPE },
		disabled: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeToggleGroupRoot>;
