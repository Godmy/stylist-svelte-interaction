import SiteMenu from '$stylist/menu/component/organism/site-menu/index.svelte';
import type { RecipeSiteMenu } from '$stylist/menu/interface/recipe/site-menu';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { SITE_MENU_SAMPLE } from '$stylist/menu/const/array/site-menu-sample';

/** Mega-menu by default; presets show the compact dropdown and the dropup layouts. */
export default {
	component: SiteMenu,
	title: 'SiteMenu',
	description: 'Searchable disclosure menu with grouped destinations.',
	args: {
		items: SITE_MENU_SAMPLE,
		active: 'overview',
		variant: 'mega',
		brand: 'ATELIER / studio',
		toggleLabel: 'Открыть разделы',
		searchLabel: 'Поиск раздела',
		emptyLabel: 'Разделы не найдены'
	},
	controls: { variant: { type: 'select', options: ['mega', 'dropdown', 'dropup'] } },
	presets: { Dropdown: { variant: 'dropdown' }, Dropup: { variant: 'dropup' } },
	layout: 'padded'
} satisfies ContractStory<RecipeSiteMenu>;
