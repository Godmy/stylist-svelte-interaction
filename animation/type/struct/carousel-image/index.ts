/** One gallery image; alt must describe its content. */
export type CarouselImage = {
	src: string;
	alt: string;
	thumbnail?: string;
	zoomSrc?: string;
};
