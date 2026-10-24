import NavigationPatterns from '$stylist/navigation/component/page/navigation-patterns/index.svelte';
import type { RecipeNavigationPatterns } from '$stylist/navigation/interface/recipe/navigation-patterns';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { SITE_MENU_SAMPLE } from '$stylist/menu/const/array/site-menu-sample';

/** One set of destinations in a header, side panel, section strip and bottom bar. */
export default {
	component: NavigationPatterns,
	title: 'NavigationPatterns',
	description: 'Navigation layouts with breadcrumbs, local search and pagination.',
	args: {
		title: 'Навигация и меню',
		items: SITE_MENU_SAMPLE,
		brand: 'ATELIER / studio',
		pageSize: 3
	},
	controls: { title: { type: 'text' }, brand: { type: 'text' }, pageSize: { type: 'number' } },
	layout: 'padded'
} satisfies ContractStory<RecipeNavigationPatterns>;
