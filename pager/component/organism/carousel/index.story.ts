import CarouselStory from '$stylist/pager/component/organism/carousel/index.story.svelte';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Swipe through 12 cards: dots collapse into «…» gaps, the 2nd card scrolls inside itself. */
export default {
	component: CarouselStory,
	title: 'Carousel',
	description:
		'Scroll-snap carousel with smart dots («…» between distant dots) and inner scrolling for long slides.',
	args: { count: 12, perView: 1, maxDots: 7 },
	controls: {
		count: { type: 'select', options: [3, 7, 12, 30] },
		perView: { type: 'select', options: [1, 2, 3] },
		maxDots: { type: 'select', options: [5, 7, 9] }
	},
	presets: { Few: { count: 3 }, Many: { count: 30 }, Desktop: { perView: 3 } },
	layout: 'padded'
} satisfies ContractStory<{ count: number; perView: number; maxDots: number }>;
