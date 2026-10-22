import MegaMenu from '$stylist/menu/component/organism/mega-menu/index.svelte';
import type { RecipeMegaMenu } from '$stylist/menu/interface/recipe/mega-menu';
import type { SlotMegaMenuSection } from '$stylist/menu/interface/slot/mega-menu-section';
import type { ContractStory } from '$stylist/html/interface/contract/story';

const sections: SlotMegaMenuSection[] = [
	{
		id: 'excursions',
		label: 'Экскурсии',
		active: true,
		intro:
			'Однодневные и двухдневные программы по Шри-Ланке с русскоговорящим гидом. Выезд из отелей западного и южного побережья.',
		columns: [
			{
				id: 'group',
				title: 'Групповые экскурсии',
				links: [
					{
						id: 'sigiriya',
						label: 'Сигирия и Дамбулла',
						href: '#excursions/sigiriya',
						description: 'Львиная скала и пещерный храм за один день',
						icon: 'map-pin',
						badge: 'ТОП'
					},
					{
						id: 'kandy',
						label: 'Канди и чайные плантации',
						href: '#excursions/kandy',
						description: 'Храм Зуба Будды, ботанический сад, чайная фабрика',
						icon: 'tree'
					},
					{
						id: 'galle',
						label: 'Галле и южное побережье',
						href: '#excursions/galle',
						description: 'Голландский форт, черепашья ферма, мангровые заросли',
						icon: 'map'
					}
				],
				moreLink: { id: 'group-all', label: 'Все групповые экскурсии', href: '#excursions/group' }
			},
			{
				id: 'private',
				title: 'Индивидуальные экскурсии',
				links: [
					{
						id: 'yala',
						label: 'Сафари в Яле',
						href: '#excursions/yala',
						description: 'Леопарды, слоны и крокодилы на джипе',
						icon: 'star',
						badge: 'Новое'
					},
					{
						id: 'whales',
						label: 'Киты в Мириссе',
						href: '#excursions/whales',
						description: 'Морская прогулка на рассвете, сезон ноябрь — апрель',
						icon: 'globe'
					},
					{
						id: 'ella',
						label: 'Элла и девятиарочный мост',
						href: '#excursions/ella',
						description: 'Поезд через горы, водопады и смотровые площадки',
						icon: 'calendar'
					}
				],
				moreLink: {
					id: 'private-all',
					label: 'Все индивидуальные экскурсии',
					href: '#excursions/private'
				}
			},
			{
				id: 'topics',
				title: 'По интересам',
				links: [
					{ id: 'nature', label: 'Природа и сафари', href: '#topics/nature', icon: 'tree' },
					{ id: 'culture', label: 'Храмы и история', href: '#topics/culture', icon: 'award' },
					{ id: 'kids', label: 'С детьми', href: '#topics/kids', icon: 'smile' },
					{ id: 'photo', label: 'Фототуры', href: '#topics/photo', icon: 'image' }
				]
			}
		],
		feature: {
			eyebrow: 'Хит сезона',
			title: 'Сигирия на рассвете',
			text: 'Подъём на Львиную скалу до жары и толп — с завтраком и трансфером из отеля.',
			href: '#excursions/sigiriya-sunrise',
			ctaLabel: 'Смотреть программу',
			icon: 'star'
		},
		footerLinks: [
			{ id: 'calendar', label: 'Календарь выездов', href: '#calendar', icon: 'calendar' },
			{ id: 'reviews', label: 'Отзывы туристов', href: '#reviews', icon: 'message-circle' },
			{ id: 'gift', label: 'Подарочный сертификат', href: '#gift', icon: 'bookmark' }
		]
	},
	{
		id: 'tours',
		label: 'Туры',
		intro: 'Многодневные маршруты по острову с проживанием, транспортом и сопровождением.',
		columns: [
			{
				id: 'duration',
				title: 'По длительности',
				links: [
					{
						id: 'tour-7',
						label: 'Тур на 7 дней',
						href: '#tours/7',
						description: 'Культурный треугольник и океан',
						icon: 'clock'
					},
					{
						id: 'tour-11',
						label: 'Тур на 11 дней',
						href: '#tours/11',
						description: 'Горы, чай, сафари и побережье',
						icon: 'clock',
						badge: 'ТОП'
					},
					{
						id: 'tour-13',
						label: 'Тур на 13 дней',
						href: '#tours/13',
						description: 'Весь остров без спешки',
						icon: 'clock'
					}
				]
			},
			{
				id: 'season',
				title: 'По сезону',
				links: [
					{ id: 'winter', label: 'Зима: юг и запад', href: '#tours/winter', icon: 'calendar' },
					{ id: 'summer', label: 'Лето: восток', href: '#tours/summer', icon: 'calendar' },
					{ id: 'new-year', label: 'Новогодние туры', href: '#tours/new-year', icon: 'star' }
				],
				moreLink: { id: 'tours-all', label: 'Все туры', href: '#tours' }
			}
		],
		feature: {
			eyebrow: 'Тур',
			title: 'Вся Шри-Ланка за 13 дней',
			text: 'От древних столиц до пляжей Тангалле — с проживанием и гидом на всём маршруте.',
			href: '#tours/13',
			ctaLabel: 'Подробнее о туре',
			image:
				"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23fbbf24'/><stop offset='0.55' stop-color='%23f97316'/><stop offset='1' stop-color='%230e7490'/></linearGradient></defs><rect width='400' height='300' fill='url(%23g)'/><circle cx='290' cy='120' r='46' fill='%23fde68a'/><path d='M0 220 Q100 170 200 215 T400 205 V300 H0Z' fill='%23155e75'/></svg>",
			imageAlt: 'Закат над океаном'
		}
	},
	{
		id: 'destinations',
		label: 'Направления',
		columns: [
			{
				id: 'south',
				title: 'Юг и побережье',
				links: [
					{ id: 'unawatuna', label: 'Унаватуна', href: '#dest/unawatuna' },
					{ id: 'mirissa', label: 'Мирисса', href: '#dest/mirissa' },
					{ id: 'hikkaduwa', label: 'Хиккадува', href: '#dest/hikkaduwa' },
					{ id: 'tangalle', label: 'Тангалле', href: '#dest/tangalle' }
				]
			},
			{
				id: 'triangle',
				title: 'Культурный треугольник',
				links: [
					{ id: 'anuradhapura', label: 'Анурадхапура', href: '#dest/anuradhapura' },
					{ id: 'polonnaruwa', label: 'Полоннарува', href: '#dest/polonnaruwa' },
					{ id: 'dambulla', label: 'Дамбулла', href: '#dest/dambulla' }
				]
			},
			{
				id: 'hills',
				title: 'Горы и чай',
				links: [
					{ id: 'nuwara', label: 'Нувара-Элия', href: '#dest/nuwara-eliya' },
					{ id: 'ella-dest', label: 'Элла', href: '#dest/ella' },
					{ id: 'horton', label: 'Плато Хортон', href: '#dest/horton' }
				]
			},
			{
				id: 'east',
				title: 'Восток',
				links: [
					{ id: 'trinco', label: 'Тринкомали', href: '#dest/trincomalee' },
					{ id: 'arugam', label: 'Аругам-Бэй', href: '#dest/arugam-bay', badge: 'Сёрф' }
				]
			}
		],
		footerLinks: [
			{ id: 'map', label: 'Карта острова', href: '#map', icon: 'map' },
			{ id: 'weather', label: 'Погода по месяцам', href: '#weather', icon: 'calendar' }
		]
	},
	{
		id: 'info',
		label: 'Туристам',
		columns: [
			{
				id: 'prepare',
				title: 'Подготовка к поездке',
				links: [
					{
						id: 'visa',
						label: 'Виза и въезд',
						href: '#info/visa',
						description: 'ETA онлайн, сроки и стоимость',
						icon: 'info'
					},
					{
						id: 'insurance',
						label: 'Страховка',
						href: '#info/insurance',
						description: 'Что важно для экскурсий и сафари',
						icon: 'security'
					}
				]
			},
			{
				id: 'booking',
				title: 'Бронирование',
				links: [
					{
						id: 'payment',
						label: 'Оплата и предоплата',
						href: '#info/payment',
						description: 'Карты РФ, рубли и доллары',
						icon: 'payment'
					},
					{
						id: 'extras',
						label: 'Дополнительные услуги',
						href: '#info/extras',
						description: 'Трансферы, обеды, входные билеты',
						icon: 'check-circle'
					}
				]
			}
		]
	},
	{ id: 'blog', label: 'Блог', href: '#blog' },
	{ id: 'contacts', label: 'Контакты', href: '#contacts' }
];

/** Top navigation with full-width panels. */
export default {
	component: MegaMenu,
	title: 'MegaMenu',
	description:
		'Top navigation with full-width panels: link columns, promo card and footer links. Hover with intent delay, click/tap toggling, ←/→ between triggers, ↓ into the panel, Esc to close.',
	args: {
		sections,
		defaultOpenId: 'excursions',
		openOnHover: true,
		compact: false,
		ariaLabel: 'Главное меню'
	},
	controls: {
		defaultOpenId: {
			type: 'select',
			// Empty: no section open on first render.
			options: ['', ...sections.filter((section) => section.columns).map((section) => section.id)],
			description: 'Section open on first render (the menu remounts when changed)'
		},
		openOnHover: { type: 'boolean', description: 'Open panels on mouse hover with intent delay' },
		compact: { type: 'boolean', description: 'Hide link descriptions inside the panels' },
		ariaLabel: { type: 'text', description: 'Accessible name of the navigation landmark' }
	},
	presets: {
		'Compact, click-only': {
			sections: [sections[1], sections[3], sections[5]],
			defaultOpenId: '',
			compact: true,
			openOnHover: false,
			ariaLabel: 'Компактное меню'
		}
	}
} satisfies ContractStory<RecipeMegaMenu>;
