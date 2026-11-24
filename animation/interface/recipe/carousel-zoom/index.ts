import type { RecipeHtmlSection } from '$stylist/html/interface/recipe/section';
import type { BehaviorCarousel } from '$stylist/animation/interface/behavior/carousel';
import type { BehaviorImageZoom } from '$stylist/animation/interface/behavior/image-zoom';
import type { CarouselImage } from '$stylist/animation/type/struct/carousel-image';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/** Image carousel with thumbnails, keyboard navigation and pointer zoom. */
export interface RecipeCarouselZoom extends ComputeIntersectAll<
	[
		Omit<RecipeHtmlSection, 'children'>,
		BehaviorCarousel,
		BehaviorImageZoom,
		{
			images: readonly CarouselImage[];
			label?: string;
			previousLabel?: string;
			nextLabel?: string;
			zoomLabel?: string;
			unzoomLabel?: string;
			thumbnailLabel?: string;
			emptyLabel?: string;
		}
	]
> {}
