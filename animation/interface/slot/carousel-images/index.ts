import type { CarouselImage } from '$stylist/animation/type/struct/carousel-image';

/** Gallery images and accessible control labels. */
export interface SlotCarouselImages {
	images: readonly CarouselImage[];
	label?: string;
	previousLabel?: string;
	nextLabel?: string;
	zoomLabel?: string;
	unzoomLabel?: string;
	thumbnailLabel?: string;
	emptyLabel?: string;
}
