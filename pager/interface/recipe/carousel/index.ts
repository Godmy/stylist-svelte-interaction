import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { ComputeIntersectAll } from '$stylist/theme/type/compute/intersect-all';

/**
 * Swipeable carousel: native scroll-snap track, dots with «…» gaps for long sets,
 * no arrows (2026-11-16). A slide taller than `--carousel-slide-max-height`
 * scrolls inside itself (long reviews).
 *
 * Layout vars: `--carousel-per-view` (1), `--carousel-gap` (16px),
 * `--carousel-slide-max-height` (none), `--carousel-accent`.
 */
export interface RecipeCarousel<TItem = unknown> extends ComputeIntersectAll<
	[
		Omit<HTMLAttributes<HTMLElement>, 'children'>,
		{
			items: readonly TItem[];
			/** Renders one slide. */
			slide: Snippet<[TItem, number]>;
			/** Accessible name of the carousel region. */
			label?: string;
			/** Most dots shown at once, gaps included (≥ 7 recommended). */
			maxDots?: number;
			/** Announcement and dot label: `Отзыв 3 из 12`. */
			slideLabel?: (index: number, count: number) => string;
			onSlideChange?: (index: number) => void;
			class?: string;
		}
	]
> {}
