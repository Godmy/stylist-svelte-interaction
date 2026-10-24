/** Selection of a gallery image; the index is bindable and reported on explicit choice. */
export interface BehaviorCarousel {
	selectedIndex?: number;
	onImageSelect?: (index: number) => void;
}
