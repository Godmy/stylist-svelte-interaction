import { carouselIndex } from '$stylist/animation/function/resolve/carousel-index';
import { pointerPosition } from '$stylist/animation/function/transform/pointer-position';
import type { RecipeCarouselZoom } from '$stylist/animation/interface/recipe/carousel-zoom';
/** Reactive behavior of carousel-zoom; props are read lazily when needed. */
export function createCarouselZoomComponentState(
	getProps: () => Pick<
		RecipeCarouselZoom,
		'images' | 'selectedIndex' | 'onImageSelect' | 'zoomEnabled' | 'zoomScale' | 'zoomOnHover'
	> & {
		selectedIndex: Exclude<RecipeCarouselZoom['selectedIndex'], undefined>;
		zoomEnabled: Exclude<RecipeCarouselZoom['zoomEnabled'], undefined>;
		zoomScale: Exclude<RecipeCarouselZoom['zoomScale'], undefined>;
		zoomOnHover: Exclude<RecipeCarouselZoom['zoomOnHover'], undefined>;
	}
) {
	const props = $derived(getProps());
	const resolvedIndex = $derived(carouselIndex(props['selectedIndex'], props['images'].length));
	const image = $derived(props['images'][resolvedIndex]);
	const safeZoomScale = $derived(
		Number.isFinite(props['zoomScale']) ? Math.min(8, Math.max(1, props['zoomScale'])) : 2.5
	);
	let position = $state({ x: 0.5, y: 0.5 });
	let pinned = $state<string | null>(null);
	let hovered = $state<string | null>(null);
	const zoomed = $derived(
		Boolean(props['zoomEnabled'] && image && (pinned === image.src || hovered === image.src))
	);
	function select(index: number) {
		const next = carouselIndex(index, props['images'].length);
		if (next < 0) return;
		pinned = null;
		hovered = null;
		position = { x: 0.5, y: 0.5 };
		props['selectedIndex'] = next;
		props['onImageSelect']?.(next);
	}
	function move(event: PointerEvent) {
		if (!props['zoomEnabled'] || event.pointerType === 'touch' || !image) return;
		position = pointerPosition(
			event.clientX,
			event.clientY,
			(event.currentTarget as HTMLElement).getBoundingClientRect()
		);
		if (props['zoomOnHover']) hovered = image.src;
	}
	function leave() {
		hovered = null;
	}
	function toggle() {
		if (!props['zoomEnabled'] || !image) return;
		pinned = pinned === image.src ? null : image.src;
		hovered = null;
		position = { x: 0.5, y: 0.5 };
	}
	function keydown(event: KeyboardEvent) {
		const target = {
			ArrowLeft: resolvedIndex - 1,
			ArrowRight: resolvedIndex + 1,
			Home: 0,
			End: props['images'].length - 1
		}[event.key];
		if (target !== undefined) {
			event.preventDefault();
			select(target);
		} else if (event.key === 'Escape') {
			pinned = null;
			hovered = null;
		}
	}
	return {
		get resolvedIndex(): typeof resolvedIndex {
			return resolvedIndex;
		},
		get image(): typeof image {
			return image;
		},
		get safeZoomScale(): typeof safeZoomScale {
			return safeZoomScale;
		},
		get position(): typeof position {
			return position;
		},
		set position(__nextValue: typeof position) {
			position = __nextValue;
		},
		get zoomed(): typeof zoomed {
			return zoomed;
		},
		get select(): typeof select {
			return select;
		},
		get move(): typeof move {
			return move;
		},
		get leave(): typeof leave {
			return leave;
		},
		get toggle(): typeof toggle {
			return toggle;
		},
		get keydown(): typeof keydown {
			return keydown;
		}
	};
}
export default createCarouselZoomComponentState;
