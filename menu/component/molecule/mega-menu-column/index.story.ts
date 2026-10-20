import MegaMenuColumn from './index.svelte';
import type { RecipeMegaMenuColumn } from '$stylist/menu/interface/recipe/mega-menu-column';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Titled list of mega menu links. */
export default {
	component: MegaMenuColumn,
	title: 'MegaMenuColumn',
	description: 'Titled list of mega menu links with an optional trailing «see all» link.',
	args: {
		title: 'Групповые экскурсии',
		links: [
			{
				id: 'sigiriya',
				label: 'Сигирия и Дамбулла',
				href: '#sigiriya',
				description: 'Львиная скала и пещерный храм за один день',
				icon: 'map-pin',
				badge: 'ТОП'
			},
			{
				id: 'kandy',
				label: 'Канди и чайные плантации',
				href: '#kandy',
				description: 'Храм Зуба Будды, ботанический сад, чайная фабрика',
				icon: 'tree',
				active: true
			},
			{
				id: 'galle',
				label: 'Галле и южное побережье',
				href: '#galle',
				description: 'Голландский форт и черепашья ферма',
				icon: 'map'
			},
			{
				id: 'ella',
				label: 'Элла и девятиарочный мост',
				href: '#ella',
				description: 'Поезд через горы и водопады',
				icon: 'calendar'
			}
		],
		compact: false,
		moreLink: { id: 'all', label: 'Все экскурсии', href: '#all' }
	},
	controls: {
		title: { type: 'text', description: 'Column heading' },
		compact: { type: 'boolean', description: 'Hide link descriptions' }
	},
	presets: {
		'South coast': {
			title: 'Юг и побережье',
			links: [
				{ id: 'unawatuna', label: 'Унаватуна', href: '#unawatuna' },
				{ id: 'mirissa', label: 'Мирисса', href: '#mirissa' },
				{ id: 'hikkaduwa', label: 'Хиккадува', href: '#hikkaduwa' },
				{ id: 'tangalle', label: 'Тангалле', href: '#tangalle', badge: 'Тихо' }
			],
			moreLink: undefined
		},
		'Compact trip prep': {
			title: 'Подготовка к поездке',
			links: [
				{ id: 'visa', label: 'Виза и въезд', href: '#visa', icon: 'info' },
				{ id: 'insurance', label: 'Страховка', href: '#insurance', icon: 'security' },
				{ id: 'payment', label: 'Оплата', href: '#payment', icon: 'payment' }
			],
			compact: true,
			moreLink: undefined
		}
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: { style: 'max-width: 22rem' },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeMegaMenuColumn>;
