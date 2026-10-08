export interface MediaSliderMediaSlide {
	id: string;
	type: 'image' | 'video';
	/** Where this asset is actually fetched from at runtime. */
	src: string;
	/** Poster frame shown before a video slide starts playing. */
	poster?: string;
	alt?: string;
	/** Running-ticker caption shown at the bottom of the slide. */
	caption?: string;
	/**
	 * Milliseconds this slide stays active before auto-advancing. Only used
	 * for image slides — video slides advance on their own `ended` event.
	 */
	durationMs?: number;
	/** Where the asset comes from, for maintainers — not rendered. */
	credit?: string;
}

/**
 * A non-media slide (e.g. a closing contact form). Rendered via the
 * slider's `formContent` snippet instead of an image/video, and never
 * auto-advances.
 */
export interface MediaSliderFormSlide {
	id: string;
	type: 'form';
	caption?: string;
}

/**
 * A slide whose own content drives when the slider moves on (e.g. a
 * scroll/wheel-scrubbed hero animation). Rendered via the slider's
 * `heroContent` snippet, which receives a `next` callback to call once its
 * own gesture-driven sequence is done. Never auto-advances on its own.
 */
export interface MediaSliderHeroSlide {
	id: string;
	type: 'hero';
	caption?: string;
}

export type MediaSliderSlide = MediaSliderMediaSlide | MediaSliderFormSlide | MediaSliderHeroSlide;
