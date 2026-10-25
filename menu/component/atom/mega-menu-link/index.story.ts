import MegaMenuLink from '$stylist/menu/component/atom/mega-menu-link/index.svelte';
import type { RecipeMegaMenuLink } from '$stylist/menu/interface/recipe/mega-menu-link';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Rich link used inside mega menu panels. */
export default {
	component: MegaMenuLink,
	title: 'MegaMenuLink',
	description:
		'Rich link used inside mega menu panels: icon tile, label with badge and an optional description line.',
	args: {
		label: 'Сафари в Яле',
		href: '#yala',
		description: 'Леопарды, слоны и крокодилы на джипе',
		icon: 'star',
		badge: 'Новое',
		active: false,
		compact: false,
		external: false
	},
	controls: {
		label: { type: 'text', description: 'Link text' },
		description: { type: 'text', description: 'Secondary line under the label' },
		icon: {
			type: 'select',
			options: ['', 'star', 'map-pin', 'map', 'tree', 'globe', 'calendar', 'info'],
			description: 'Icon name from the svg set (empty to hide)'
		},
		badge: { type: 'text', description: 'Short badge after the label (empty to hide)' },
		active: { type: 'boolean', description: 'Marks the link as the current page' },
		compact: { type: 'boolean', description: 'Single-line rendering without description' },
		external: { type: 'boolean', description: 'Open in a new tab' }
	},
	presets: {
		Top: {
			label: 'Сигирия и Дамбулла',
			href: '#sigiriya',
			description: 'Львиная скала и пещерный храм за один день',
			icon: 'map-pin',
			badge: 'ТОП'
		},
		Active: {
			label: 'Канди и чайные плантации',
			href: '#kandy',
			description: 'Текущая страница',
			icon: 'tree',
			badge: '',
			active: true
		},
		Plain: {
			label: 'Без иконки и описания',
			href: '#plain',
			icon: undefined,
			description: '',
			badge: ''
		},
		Compact: {
			label: 'Компактная ссылка',
			href: '#compact',
			icon: 'calendar',
			badge: '',
			compact: true
		}
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: { style: 'max-width: 22rem' },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeMegaMenuLink>;
