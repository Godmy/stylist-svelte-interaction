import SectionBar from '$stylist/navigation/component/molecule/section-bar/index.svelte';
import type { RecipeSectionBar } from '$stylist/navigation/interface/recipe/section-bar';
import type { ContractStory } from '$stylist/html/interface/contract/story';
import { SITE_MENU_SAMPLE } from '$stylist/menu/const/array/site-menu-sample';

/** Scrolling section strip; the preset pins the first four destinations as a bottom bar. */
export default {
	component: SectionBar,
	title: 'SectionBar',
	description: 'Flat row of destinations as a section strip or a bottom bar.',
	args: {
		items: SITE_MENU_SAMPLE,
		active: 'overview',
		placement: 'strip',
		'aria-label': 'Полоса разделов'
	},
	controls: { placement: { type: 'select', options: ['strip', 'bottom'] } },
	presets: {
		Bottom: {
			items: SITE_MENU_SAMPLE.slice(0, 4),
			placement: 'bottom',
			'aria-label': 'Нижняя навигация'
		}
	},
	layout: 'padded'
} satisfies ContractStory<RecipeSectionBar>;
