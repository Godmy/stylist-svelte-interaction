import WorkspaceMenu from '$stylist/navigation/component/organism/workspace-menu/index.svelte';
import type { RecipeWorkspaceMenu } from '$stylist/navigation/interface/recipe/workspace-menu';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { SITE_MENU_SAMPLE } from '$stylist/menu/const/array/site-menu-sample';

/** Expanded panel by default; the preset starts collapsed to first letters. */
export default {
	component: WorkspaceMenu,
	title: 'WorkspaceMenu',
	description: 'Collapsible side panel with destinations grouped into sections.',
	args: {
		items: SITE_MENU_SAMPLE,
		active: 'overview',
		compact: false,
		label: 'Разделы рабочего пространства',
		collapseLabel: 'Свернуть панель',
		expandLabel: 'Развернуть панель',
		itemLabel: 'Раздел'
	},
	controls: { compact: { type: 'boolean' } },
	presets: { Compact: { compact: true } },
	layout: 'padded'
} satisfies ContractStory<RecipeWorkspaceMenu>;
