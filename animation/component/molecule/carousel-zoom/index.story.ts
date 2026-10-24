import CarouselZoom from '$stylist/animation/component/molecule/carousel-zoom/index.svelte';
import type { RecipeCarouselZoom } from '$stylist/animation/interface/recipe/carousel-zoom';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Self-contained SVG images; every zoom setting and label is a control. */
export default {
	component: CarouselZoom,
	title: 'CarouselZoom',
	description:
		'Галерея с миниатюрами, стрелками и клавишами ←/→/Home/End. Наведите курсор, чтобы увеличить, или нажмите на изображение; Escape сбрасывает увеличение.',
	args: {
		images: [
			{
				src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='480'%3E%3Crect width='640' height='480' fill='%234338ca'/%3E%3Ccircle cx='320' cy='240' r='100' fill='%23fbbf24'/%3E%3C/svg%3E",
				alt: 'Gold circle on an indigo background'
			},
			{
				src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='480'%3E%3Crect width='640' height='480' fill='%230f766e'/%3E%3Cpath d='M320 100L480 360H160Z' fill='%23f9a8d4'/%3E%3C/svg%3E",
				alt: 'Pink triangle on a teal background'
			},
			{
				src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='480'%3E%3Crect width='640' height='480' fill='%23be123c'/%3E%3Crect x='220' y='140' width='200' height='200' rx='24' fill='%23fde68a'/%3E%3C/svg%3E",
				alt: 'Pale yellow square on a crimson background'
			}
		],
		selectedIndex: 0,
		zoomEnabled: true,
		zoomScale: 2.5,
		zoomOnHover: true,
		label: 'Image gallery',
		previousLabel: 'Previous image',
		nextLabel: 'Next image',
		zoomLabel: 'Zoom image',
		unzoomLabel: 'Reset zoom',
		thumbnailLabel: 'Select image',
		emptyLabel: 'No images'
	},
	controls: {
		selectedIndex: { type: 'range', label: 'Выбранное изображение', min: 0, max: 2, step: 1 },
		zoomEnabled: { type: 'boolean', label: 'Увеличение' },
		zoomScale: { type: 'range', label: 'Кратность', min: 1, max: 8, step: 0.5 },
		zoomOnHover: { type: 'boolean', label: 'Увеличивать при наведении' },
		label: { type: 'text', label: 'Название галереи' },
		previousLabel: { type: 'text', label: 'Кнопка «назад»' },
		nextLabel: { type: 'text', label: 'Кнопка «вперёд»' },
		zoomLabel: { type: 'text', label: 'Увеличить' },
		unzoomLabel: { type: 'text', label: 'Сбросить увеличение' },
		thumbnailLabel: { type: 'text', label: 'Миниатюра' },
		emptyLabel: { type: 'text', label: 'Пустая галерея' }
	},
	presets: {
		'Только по нажатию': { zoomOnHover: false },
		'Без увеличения': { zoomEnabled: false },
		Пустая: { images: [] }
	},
	layout: 'padded'
} satisfies ContractStory<RecipeCarouselZoom>;
