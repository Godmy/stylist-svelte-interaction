import TabList from '$stylist/dialog/component/atom/tab-list/index.svelte';
import type { RecipeTabList } from '$stylist/dialog/interface/recipe/tab-list';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import type { TokenSize } from '$stylist/design-token/type/alias/size';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Tab strip; index.story.svelte fills it with four Tab items inside a Tabs context. */
export default {
	component: TabList,
	title: 'TabList',
	description: 'Horizontal navigation container for related Tab items.',
	args: {
		// Story knobs: selected tab and tab size, both applied to the Tabs parent.
		selectedId: 'profile',
		size: 'md',
		disabled: false
	},
	controls: {
		selectedId: { type: 'select', options: ['profile', 'billing', 'security'] },
		size: { type: 'select', options: TOKEN_SIZE.slice(1, 4) },
		disabled: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeTabList & { selectedId?: string; size?: TokenSize }>;
