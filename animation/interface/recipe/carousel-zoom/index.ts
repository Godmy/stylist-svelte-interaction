import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { BehaviorCarousel } from '$stylist/animation/interface/behavior/carousel';
import type { BehaviorImageZoom } from '$stylist/animation/interface/behavior/image-zoom';
import type { SlotCarouselImages } from '$stylist/animation/interface/slot/carousel-images';

/** Image carousel with thumbnails, keyboard navigation and pointer zoom. */
export interface RecipeCarouselZoom
	extends
		Omit<RecipeHtmlSection, 'children'>,
		BehaviorCarousel,
		BehaviorImageZoom,
		SlotCarouselImages {}
