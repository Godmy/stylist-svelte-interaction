import type { MediaSliderSlide } from '$stylist/animation/type/object/media-slider';

/**
 * Slides for the homepage's `MediaSlider`
 * (`travel-commerce/component/template/travel-landing`). The first slide is
 * the `type: 'hero'` scroll/wheel-scrubbed TurtleHeroMorph sequence
 * (rendered via the slider's `heroContent` snippet, wired up in
 * travel-landing/index.svelte) — it never auto-advances; the carousel moves
 * on to `aerial-beach` only once its own gesture-driven morph completes and
 * the visitor keeps scrolling. The rest are remote URLs (Unsplash, Mixkit).
 */
export const MEDIA_SLIDER_SLIDES: MediaSliderSlide[] = [
	{
		// Rendered by travel-landing's `heroContent` snippet as
		// <TurtleHeroMorphSlide>: 01.png at rest → 02.png as the user starts
		// scrolling → photo/logo morph → wordmark, all driven by wheel/touch
		// captured on the slide itself (see MediaSliderHeroSlide).
		id: 'hero-morph',
		type: 'hero',
		caption: 'Пролистайте вниз — путешествие начинается'
	},
	{
		id: 'aerial-beach',
		type: 'video',
		// Mixkit Free License (no attribution required, commercial use OK):
		// https://mixkit.co/free-stock-video/dynamic-drone-video-of-a-sunny-beach-44386/
		// Hotlinked from Mixkit's own CDN like the rest of this preset's remote
		// assets — worth downloading and self-hosting under static/ before
		// relying on this in production, since hotlinking isn't guaranteed
		// stable long-term.
		src: 'https://assets.mixkit.co/videos/44386/44386-720.mp4',
		alt: 'Аэросъёмка пляжа с пальмами',
		caption: 'Остров с высоты птичьего полёта',
		credit: 'Mixkit, remote — dynamic-drone-video-of-a-sunny-beach-44386'
	},
	{
		id: 'ocean',
		type: 'image',
		// Was a video slide pointing at MDN's generic cc0 sample clip
		// ("flower.mp4") mislabeled as an ocean scene — replaced with the
		// slide's own (genuinely ocean) poster photo. durationMs only applies
		// to image slides; video slides always advance on their own `ended`
		// event, so it had no effect here before.
		src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80',
		alt: 'Волны на закате',
		caption: 'Вода движется медленно',
		durationMs: 3000,
		credit: 'Unsplash, remote — photo-1507525428034-b723cf961d3e'
	},
	{
		id: 'tea',
		type: 'image',
		src: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1800&q=80',
		alt: 'Чайные плантации в горах',
		caption: 'Чайные плантации и облака',
		durationMs: 6000,
		credit: 'Unsplash, remote — photo-1566296314736-6eaac1ca0cb9'
	},
	{
		id: 'wildlife',
		type: 'image',
		src: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1800&q=80',
		alt: 'Слон в природном парке',
		caption: 'Сафари, слоны и заповедники',
		durationMs: 6000,
		credit: 'Unsplash, remote — photo-1549366021-9f761d450615'
	},
	{
		// Closing slide: a contact-request form instead of media. Never
		// auto-advances (see MediaSliderFormSlide) — the visitor has to
		// navigate away manually, same as reaching the end of a carousel.
		id: 'contact',
		type: 'form'
	}
];
