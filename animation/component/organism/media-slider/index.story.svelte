<script lang="ts">
	import MediaSlider from './index.svelte';
	import type { RecipeMediaSlider } from '$stylist/animation/interface/recipe/media-slider';
	import type { MediaSliderSlide } from '$stylist/animation/type/object/media-slider';

	// Render of index.story.ts: the caption, video and cross-fade knobs build the slides array and the transition custom property.
	let {
		showVideo = false,
		transitionDuration = 800,
		caption1 = '',
		caption2 = '',
		caption3 = '',
		...args
	}: Partial<RecipeMediaSlider> & {
		showVideo?: boolean;
		transitionDuration?: number;
		caption1?: string;
		caption2?: string;
		caption3?: string;
	} = $props();

	const oceanPoster =
		'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80';

	const slides = $derived<MediaSliderSlide[]>([
		{
			id: 'palms',
			type: 'image',
			src: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1800&q=80',
			alt: 'Пальмы и тропический берег',
			caption: caption1
		},
		showVideo
			? {
					id: 'ocean-video',
					type: 'video',
					src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
					poster: oceanPoster,
					alt: 'Видео-сцена океана',
					caption: caption2
				}
			: {
					id: 'ocean',
					type: 'image',
					src: oceanPoster,
					alt: 'Песчаный берег и океан',
					caption: caption2
				},
		{
			id: 'tea',
			type: 'image',
			src: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1800&q=80',
			alt: 'Чайные плантации в горах',
			caption: caption3
		}
	]);
</script>

<div
	class="_c1"
	style:--c-media-slider-transition-duration={`${Math.max(0, transitionDuration)}ms`}
>
	<MediaSlider {...args} {slides} />
</div>

<style>
	._c1 {
		--c-media-slider-height: 70vh;
		height: 70vh;
		overflow: hidden;
		border-radius: 0.5rem;
	}
</style>
