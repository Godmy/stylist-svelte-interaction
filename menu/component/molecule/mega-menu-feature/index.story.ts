import MegaMenuFeature from './index.svelte';
import type { RecipeMegaMenuFeature } from '$stylist/menu/interface/recipe/mega-menu-feature';
import type { ContractStory } from '$stylist/html/interface/contract/story';

const sunsetImage =
	"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%23fbbf24'/><stop offset='0.55' stop-color='%23f97316'/><stop offset='1' stop-color='%230e7490'/></linearGradient></defs><rect width='400' height='300' fill='url(%23g)'/><circle cx='290' cy='120' r='46' fill='%23fde68a'/><path d='M0 220 Q100 170 200 215 T400 205 V300 H0Z' fill='%23155e75'/></svg>";

/** Promo card for the side of a mega menu panel. */
export default {
	component: MegaMenuFeature,
	title: 'MegaMenuFeature',
	description:
		'Promo card for the side of a mega menu panel: gradient with icon or background image with overlay.',
	args: {
		eyebrow: 'Хит сезона',
		title: 'Сигирия на рассвете',
		text: 'Подъём на Львиную скалу до жары и толп — с завтраком и трансфером из отеля.',
		ctaLabel: 'Смотреть программу',
		href: '#feature',
		icon: 'star',
		image: '',
		imageAlt: 'Закат над океаном'
	},
	controls: {
		eyebrow: { type: 'text', description: 'Small caption above the title' },
		title: { type: 'text', description: 'Card heading' },
		text: { type: 'text', description: 'Body text' },
		ctaLabel: { type: 'text', description: 'Call-to-action label' },
		image: {
			type: 'select',
			options: ['', sunsetImage],
			description: 'Background image used instead of the gradient + icon (empty for none)'
		}
	},
	presets: {
		'With image': { image: sunsetImage },
		Tour: {
			eyebrow: 'Тур',
			title: 'Вся Шри-Ланка за 13 дней',
			text: 'От древних столиц до пляжей Тангалле.',
			ctaLabel: 'Подробнее',
			href: '#tour-13',
			image: sunsetImage
		},
		Gift: {
			eyebrow: 'Подарок',
			title: 'Подарочный сертификат',
			text: 'На любую групповую или индивидуальную экскурсию.',
			ctaLabel: 'Оформить',
			href: '#gift',
			icon: 'bookmark'
		},
		'Title only': {
			eyebrow: '',
			title: 'Только заголовок',
			text: '',
			ctaLabel: '',
			href: '#plain',
			icon: 'map'
		}
	},
	context: {
		kind: 'element',
		tag: 'div',
		attrs: { style: 'max-width: 18rem' },
		children: [{ kind: 'outlet' }]
	}
} satisfies ContractStory<RecipeMegaMenuFeature>;
