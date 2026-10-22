import Tab from '$stylist/dialog/component/atom/tab/index.svelte';
import type { RecipeTab } from '$stylist/dialog/interface/recipe/tab';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Tab item states; index.story.svelte mounts three tabs inside a Tabs context. */
export default {
	component: Tab,
	title: 'Tab',
	description: 'Button-level states for one item inside a Tabs context.',
	args: {
		// Story knob: id of the tab the Tabs parent selects.
		selectedId: 'overview',
		size: 'md',
		variant: 'primary',
		disabled: false
	},
	controls: {
		selectedId: { type: 'select', options: ['overview', 'activity', 'settings'] },
		size: { type: 'select', options: TOKEN_SIZE.slice(1, 4) },
		variant: { type: 'select', options: TOKEN_COLOR_TONE },
		disabled: { type: 'boolean', label: 'disable settings tab' }
	}
} satisfies ContractStory<RecipeTab & { selectedId?: string }>;
