import TiltCard from '$stylist/animation/component/molecule/tilt-card/index.svelte';
import type { RecipeTiltCard } from '$stylist/animation/interface/recipe/tilt-card';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Pointer-driven perspective around focusable content; every tilt setting is a control. */
export default {
	component: TiltCard,
	title: 'TiltCard',
	description:
		'Наклон карточки за курсором. Эффект отключается при prefers-reduced-motion, на сенсорных экранах и на устройствах без hover.',
	args: {
		label: 'Perspective card demo',
		disabled: false,
		maxAngle: 16,
		strength: 1,
		perspective: 1000,
		scale: 1.02,
		depth: 0,
		duration: 180,
		glare: false,
		glareOpacity: 0.3,
		reverse: false,
		xAxis: true,
		yAxis: true,
		recovery: true
	},
	controls: {
		label: { type: 'text', label: 'Доступное имя' },
		disabled: { type: 'boolean', label: 'Отключить эффект' },
		maxAngle: { type: 'range', label: 'Угол наклона, °', min: 0, max: 45, step: 1 },
		strength: { type: 'range', label: 'Сила', min: 0, max: 4, step: 0.1 },
		perspective: { type: 'range', label: 'Перспектива, px', min: 300, max: 2000, step: 50 },
		scale: { type: 'range', label: 'Увеличение', min: 0.9, max: 1.2, step: 0.01 },
		depth: { type: 'range', label: 'Глубина содержимого, px', min: 0, max: 100, step: 1 },
		duration: { type: 'range', label: 'Длительность перехода, мс', min: 0, max: 600, step: 20 },
		glare: { type: 'boolean', label: 'Блик' },
		glareOpacity: { type: 'range', label: 'Яркость блика', min: 0, max: 1, step: 0.05 },
		reverse: { type: 'boolean', label: 'Обратный наклон' },
		xAxis: { type: 'boolean', label: 'Вращение X' },
		yAxis: { type: 'boolean', label: 'Вращение Y' },
		recovery: { type: 'boolean', label: 'Возврат при уходе курсора' }
	},
	presets: {
		'С бликом и глубиной': { glare: true, depth: 30, scale: 1.04 },
		Обратный: { reverse: true },
		'Только по X': { yAxis: false }
	},
	layout: 'centered'
} satisfies ContractStory<RecipeTiltCard>;
