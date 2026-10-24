import TiltShowcase from '$stylist/animation/component/page/tilt-showcase/index.svelte';
import type { RecipeTiltShowcase } from '$stylist/animation/interface/recipe/tilt-showcase';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Tilt, glare and depth on an art card; the effect is set from the story panel. */
export default {
	component: TiltShowcase,
	title: 'TiltShowcase',
	description:
		'Наклон, блик и глубина в одном компоненте. Под карточкой — текущий угол. Эффект отключается при reduced motion и на устройствах без hover.',
	args: {
		title: 'Карточка с глубиной',
		eyebrow: 'ATELIER / DIGITAL OBJECTS',
		heading: 'Другой угол зрения.',
		text: 'Объёмная типографика и свет, следующий за курсором.',
		disabled: false,
		maxAngle: 12,
		strength: 1,
		perspective: 800,
		scale: 1.03,
		depth: 25,
		duration: 180,
		glare: true,
		glareOpacity: 0.3,
		reverse: false,
		xAxis: true,
		yAxis: true,
		recovery: true
	},
	controls: {
		title: { type: 'text', label: 'Название' },
		eyebrow: { type: 'text', label: 'Надзаголовок' },
		heading: { type: 'text', label: 'Заголовок' },
		text: { type: 'text', label: 'Текст' },
		disabled: { type: 'boolean', label: 'Отключить эффект' },
		maxAngle: { type: 'range', label: 'Угол наклона, °', min: 0, max: 30, step: 1 },
		strength: { type: 'range', label: 'Сила', min: 0, max: 2, step: 0.1 },
		perspective: { type: 'range', label: 'Перспектива, px', min: 300, max: 1500, step: 50 },
		scale: { type: 'range', label: 'Увеличение', min: 1, max: 1.15, step: 0.01 },
		depth: { type: 'range', label: 'Глубина содержимого, px', min: 0, max: 80, step: 1 },
		duration: { type: 'range', label: 'Длительность перехода, мс', min: 0, max: 600, step: 20 },
		glare: { type: 'boolean', label: 'Блик' },
		glareOpacity: { type: 'range', label: 'Яркость блика', min: 0, max: 1, step: 0.05 },
		reverse: { type: 'boolean', label: 'Обратный наклон' },
		xAxis: { type: 'boolean', label: 'Вращение X' },
		yAxis: { type: 'boolean', label: 'Вращение Y' },
		recovery: { type: 'boolean', label: 'Возврат при уходе курсора' }
	},
	layout: 'padded'
} satisfies ContractStory<RecipeTiltShowcase>;
