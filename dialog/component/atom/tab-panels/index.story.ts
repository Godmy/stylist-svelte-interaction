import TabPanels from '$stylist/dialog/component/atom/tab-panels/index.svelte';
import type { RecipeTabPanels } from '$stylist/dialog/interface/recipe/tab-panels';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Panel region; index.story.svelte fills it with three TabPanel items inside a Tabs context. */
export default {
	component: TabPanels,
	title: 'TabPanels',
	description: 'Content region that groups TabPanel items and applies shared disabled state.',
	args: {
		// Story knob: selected tab of the Tabs parent.
		selectedId: 'summary',
		disabled: false
	},
	controls: {
		selectedId: { type: 'select', options: ['summary', 'files', 'logs'] },
		disabled: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeTabPanels & { selectedId?: string }>;
