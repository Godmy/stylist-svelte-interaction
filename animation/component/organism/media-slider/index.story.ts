import MediaSlider from '$stylist/animation/component/organism/media-slider/index.svelte';
import type { RecipeMediaSlider } from '$stylist/animation/interface/recipe/media-slider';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/**
 * Story-only knobs: the render builds `slides` from the captions and the video toggle, and
 * sets `--c-media-slider-transition-duration` from `transitionDuration` (ms).
 */
type Knobs = {
	showVideo?: boolean;
	transitionDuration?: number;
	caption1?: string;
	caption2?: string;
	caption3?: string;
};

/** Smooth cross-fade between photos without a background flash. */
export default {
	component: MediaSlider,
	title: 'MediaSlider',
	description:
		'Плавное растворение между фотографиями без мигания фона. Настройте длительность перехода, переключайте стрелками или включите автопоказ и видеослайд. Учитывает prefers-reduced-motion.',
	args: {
		showVideo: false,
		transitionDuration: 800,
		autoPlay: true,
		autoPlayInterval: 4000,
		showControls: true,
		showIndicators: true,
		scrollReveal: false,
		caption1: 'Пальмы, океан и тёплый свет',
		caption2: 'Вода движется медленно',
		caption3: 'Чайные плантации и облака'
	},
	controls: {
		showVideo: { type: 'boolean', label: 'Видеослайд' },
		transitionDuration: { type: 'number', label: 'Растворение (мс)' },
		autoPlay: { type: 'boolean' },
		autoPlayInterval: { type: 'number' },
		showControls: { type: 'boolean' },
		showIndicators: { type: 'boolean' },
		caption1: { type: 'text', label: 'Подпись слайда 1' },
		caption2: { type: 'text', label: 'Подпись слайда 2' },
		caption3: { type: 'text', label: 'Подпись слайда 3' }
	},
	presets: {
		Video: { showVideo: true }
	}
} satisfies ContractStory<RecipeMediaSlider & Knobs>;
