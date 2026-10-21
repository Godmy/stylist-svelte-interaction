import MegaMenuPanel from './index.svelte';
import type { RecipeMegaMenuPanel } from '$stylist/menu/interface/recipe/mega-menu-panel';
import type { SlotMegaMenuSection } from '$stylist/menu/interface/slot/mega-menu-section';
import type { ContractStory } from '$stylist/html/interface/contract/story';

const section: SlotMegaMenuSection = {
	id: 'excursions',
	label: 'Экскурсии',
	intro: 'Однодневные программы по Шри-Ланке с русскоговорящим гидом и трансфером из отеля.',
	columns: [
		{
			id: 'group',
			title: 'Групповые экскурсии',
			links: [
				{
					id: 'sigiriya',
					label: 'Сигирия и Дамбулла',
					href: '#sigiriya',
					description: 'Львиная скала и пещерный храм',
					icon: 'map-pin',
					badge: 'ТОП'
				},
				{
					id: 'kandy',
					label: 'Канди и чайные плантации',
					href: '#kandy',
					description: 'Храм Зуба Будды и чайная фабрика',
					icon: 'tree'
				}
			],
			moreLink: { id: 'group-all', label: 'Все групповые', href: '#group' }
		},
		{
			id: 'private',
			title: 'Индивидуальные экскурсии',
			links: [
				{
					id: 'yala',
					label: 'Сафари в Яле',
					href: '#yala',
					description: 'Леопарды и слоны на джипе',
					icon: 'star',
					badge: 'Новое'
				},
				{
					id: 'whales',
					label: 'Киты в Мириссе',
					href: '#whales',
					description: 'Морская прогулка на рассвете',
					icon: 'globe'
				}
			],
			moreLink: { id: 'private-all', label: 'Все индивидуальные', href: '#private' }
		},
		{
			id: 'topics',
			title: 'По интересам',
			links: [
				{ id: 'nature', label: 'Природа и сафари', href: '#nature', icon: 'tree' },
				{ id: 'culture', label: 'Храмы и история', href: '#culture', icon: 'award' },
				{ id: 'kids', label: 'С детьми', href: '#kids', icon: 'smile' }
			]
		}
	],
	feature: {
		eyebrow: 'Хит сезона',
		title: 'Сигирия на рассвете',
		text: 'Подъём на скалу до жары и толп — с завтраком и трансфером.',
		href: '#sunrise',
		ctaLabel: 'Смотреть программу',
		icon: 'star'
	},
	footerLinks: [
		{ id: 'calendar', label: 'Календарь выездов', href: '#calendar', icon: 'calendar' },
		{ id: 'reviews', label: 'Отзывы туристов', href: '#reviews', icon: 'message-circle' }
	]
};

/** Content of one mega menu section. */
export default {
	component: MegaMenuPanel,
	title: 'MegaMenuPanel',
	description:
		'Content of one mega menu section: intro, grid of link columns, optional promo card and footer links.',
	args: { section, compact: false },
	controls: {
		compact: { type: 'boolean', description: 'Hide link descriptions' }
	},
	presets: {
		'Without intro and footer': {
			section: { ...section, intro: undefined, footerLinks: undefined }
		},
		'Two columns, no feature': {
			section: { ...section, columns: section.columns?.slice(0, 2), feature: undefined }
		},
		'Columns only, compact': {
			section: { id: 'only-columns', label: 'Направления', columns: section.columns },
			compact: true
		},
		'Feature only': {
			section: { id: 'only-feature', label: 'Акция', feature: section.feature }
		}
	}
} satisfies ContractStory<RecipeMegaMenuPanel>;
