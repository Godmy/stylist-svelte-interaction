import ActionSegmentedControl from './index.svelte';
import type { RecipeActionSegmentedControl } from '$stylist/control/interface/recipe/action-segmented-control';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Segmented control for switching views. */
export default {
	component: ActionSegmentedControl,
	title: 'ActionSegmentedControl',
	description: 'Segmented control for switching views',
	args: { items: ['Overview', 'Specs', 'Reviews'], selectedIndex: 0 },
	controls: {
		selectedIndex: { type: 'number', min: 0, max: 2, step: 1, description: 'Selected item index' }
	}
} satisfies ContractStory<RecipeActionSegmentedControl>;
