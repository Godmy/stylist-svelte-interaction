import TabPanel from './index.svelte';
import type { RecipeTabPanel } from '$stylist/dialog/interface/recipe/tab-panel';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Content panel; index.story.svelte shows three panels switched by a Tabs context. */
export default {
	component: TabPanel,
	title: 'TabPanel',
	description: 'Single content panel that becomes visible when its id matches the selected Tab.',
	args: {
		// Story knobs: selected tab of the Tabs parent and the disabled state of the API tab.
		selectedId: 'docs',
		disabledApi: false
	},
	controls: {
		selectedId: { type: 'select', options: ['docs', 'api', 'faq'] },
		disabledApi: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeTabPanel & { selectedId?: string; disabledApi?: boolean }>;
