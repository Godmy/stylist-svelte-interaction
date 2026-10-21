import Tabs from './index.svelte';
import type { RecipeTabs } from '$stylist/dialog/interface/recipe/tabs';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { TOKEN_COLOR_TONE } from '$stylist/design-token/const/array/color-tone';
import { TOKEN_SIZE } from '$stylist/design-token/const/array/size';

/** Compound tabs; index.story.svelte composes TabList, Tab, TabPanels and TabPanel children. */
export default {
	component: Tabs,
	title: 'Tabs',
	description:
		'Complete compound tabs composition with navigation, active state, and content panels.',
	args: {
		selectedId: 'overview',
		size: 'md',
		variant: 'primary',
		disabled: false
	},
	controls: {
		selectedId: { type: 'select', options: ['overview', 'activity', 'settings'] },
		size: { type: 'select', options: TOKEN_SIZE.slice(1, 4) },
		variant: { type: 'select', options: TOKEN_COLOR_TONE },
		disabled: { type: 'boolean' }
	}
} satisfies ContractStory<RecipeTabs>;
