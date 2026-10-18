import ShortcutsPanel from './index.svelte';
import type { RecipeShortcutsPanel } from '$stylist/control/interface/recipe/shortcuts-panel';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Keyboard shortcut reference panel. */
export default {
	component: ShortcutsPanel,
	title: 'Shortcuts Panel',
	description:
		'Keyboard shortcut reference grouped by navigation, view, action, viewport, tab, and utility commands.',
	args: {},
	controls: {}
} satisfies ContractStory<RecipeShortcutsPanel>;
