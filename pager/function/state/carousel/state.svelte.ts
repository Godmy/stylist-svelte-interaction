import { untrack } from 'svelte';
import type { RecipeCarousel } from '$stylist/pager/interface/recipe/carousel';

/**
 * Carousel state: the scroll-snap track is the source of truth for the current
 * page; dots collapse into `1 … 4 5 6 … 20` when there are more than `maxDots`.
 */
export function createCarouselState<TItem>(getProps: () => RecipeCarousel<TItem>) {
	const props = $derived(getProps());
	const count = $derived(props.items.length);
	const maxDots = $derived(Math.max(5, props.maxDots ?? 7));
	const slideLabel = $derived(
		props.slideLabel ?? ((index: number, total: number) => `${index + 1} из ${total}`)
	);

	// Plain, not $state: the track is only used imperatively. Reading reactive state
	// inside the `{@attach}` effect made it re-run on its own writes (a 7 s freeze
	// with 21 reviews, 2026-11-16).
	let track: HTMLElement | undefined;
	let current = $state(0);
	// Pages = positions the track can snap to (fewer than slides when several are in view).
	let pageCount = $state(1);

	const pages = $derived(Math.max(1, Math.min(pageCount, count)));
	const active = $derived(Math.min(current, pages - 1));

	type Dot =
		| { kind: 'dot'; key: string; index: number; edge: boolean }
		| { kind: 'gap'; key: string; target: number; from: number; to: number };

	const dots = $derived.by<Dot[]>(() => {
		const dot = (index: number, edge = false): Dot => ({
			kind: 'dot',
			key: `d${index}`,
			index,
			edge
		});
		const gap = (key: string, from: number, to: number): Dot => ({
			kind: 'gap',
			key,
			from,
			to,
			target: Math.round((from + to) / 2)
		});
		const last = pages - 1;
		if (pages <= maxDots) return Array.from({ length: pages }, (_, index) => dot(index));
		// Near an end: a run of `maxDots - 2` dots, one gap, the far end.
		const run = maxDots - 2;
		if (active < run - 1) {
			return [
				...Array.from({ length: run }, (_, index) => dot(index, index === run - 1)),
				gap('gap-end', run, last - 1),
				dot(last)
			];
		}
		if (active > last - run + 1) {
			const start = last - run + 1;
			return [
				dot(0),
				gap('gap-start', 1, start - 1),
				...Array.from({ length: run }, (_, offset) => dot(start + offset, offset === 0))
			];
		}
		// Middle: first … window around the current page … last.
		const half = Math.floor((maxDots - 4) / 2);
		const start = active - half;
		const end = start + (maxDots - 4) - 1;
		return [
			dot(0),
			gap('gap-start', 1, start - 1),
			...Array.from({ length: end - start + 1 }, (_, offset) =>
				dot(start + offset, offset === 0 || start + offset === end)
			),
			gap('gap-end', end + 1, last - 1),
			dot(last)
		];
	});

	function step(): number {
		const first = track?.children[0] as HTMLElement | undefined;
		if (!track || !first) return 0;
		const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
		return first.offsetWidth + gap;
	}

	function measure() {
		if (!track) return;
		const size = step();
		if (!size) return;
		pageCount = Math.round((track.scrollWidth - track.clientWidth) / size) + 1;
		const index = Math.round(track.scrollLeft / size);
		if (index !== current) {
			current = index;
			props.onSlideChange?.(index);
		}
	}

	function goTo(index: number) {
		if (!track) return;
		const target = Math.max(0, Math.min(pages - 1, index));
		const reduce =
			typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
		track.scrollTo({ left: target * step(), behavior: reduce ? 'auto' : 'smooth' });
	}

	const prev = () => goTo(active - 1);
	const next = () => goTo(active + 1);

	function onKeydown(event: KeyboardEvent) {
		// Inner slide scrolling keeps the vertical arrows; only left/right page.
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			prev();
		} else if (event.key === 'ArrowRight') {
			event.preventDefault();
			next();
		}
	}

	/** `{@attach}` for the track: follows scroll and size. */
	function attachTrack(node: HTMLElement) {
		track = node;
		let frame = 0;
		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(measure);
		};
		node.addEventListener('scroll', onScroll, { passive: true });
		const observer =
			typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(() => onScroll());
		observer?.observe(node);
		untrack(measure);
		return () => {
			cancelAnimationFrame(frame);
			node.removeEventListener('scroll', onScroll);
			observer?.disconnect();
			if (track === node) track = undefined;
		};
	}

	/**
	 * `{@attach}` for a slide body: `data-overflow` while its content is taller than
	 * the slide, `data-at-end` once scrolled to the bottom — the fade hint follows them.
	 */
	function attachSlideBody(node: HTMLElement) {
		const update = () => {
			const overflow = node.scrollHeight - node.clientHeight > 2;
			node.dataset.overflow = String(overflow);
			node.dataset.atEnd = String(
				!overflow || node.scrollTop + node.clientHeight >= node.scrollHeight - 2
			);
		};
		// The mouse wheel reads a long slide, then moves the page on (2026-11-16).
		// Chrome latches a wheel gesture to the slide even at its end (a fraction of
		// a pixel left), so at an edge the page is scrolled by hand.
		const onWheel = (event: WheelEvent) => {
			if (event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
			const max = node.scrollHeight - node.clientHeight;
			if (max <= 2) return;
			const atTop = node.scrollTop <= 1;
			const atBottom = node.scrollTop >= max - 1;
			if ((event.deltaY > 0 && !atBottom) || (event.deltaY < 0 && !atTop)) return;
			event.preventDefault();
			const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
			window.scrollBy({ top: event.deltaY * unit, behavior: 'instant' });
		};
		node.addEventListener('scroll', update, { passive: true });
		node.addEventListener('wheel', onWheel, { passive: false });
		const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update);
		observer?.observe(node);
		if (node.firstElementChild) observer?.observe(node.firstElementChild);
		update();
		return () => {
			node.removeEventListener('scroll', update);
			node.removeEventListener('wheel', onWheel);
			observer?.disconnect();
		};
	}

	const restProps = $derived.by(() => {
		const {
			items: _items,
			slide: _slide,
			label: _label,
			maxDots: _maxDots,
			slideLabel: _slideLabel,
			onSlideChange: _onSlideChange,
			class: _class,
			...rest
		} = props;
		return rest;
	});

	return {
		get items() {
			return props.items;
		},
		get count() {
			return count;
		},
		get pages() {
			return pages;
		},
		get active() {
			return active;
		},
		get dots() {
			return dots;
		},
		get label() {
			return props.label;
		},
		get className() {
			return ['carousel', props.class].filter(Boolean).join(' ');
		},
		get restProps() {
			return restProps;
		},
		slideLabel: (index: number) => slideLabel(index, count),
		goTo,
		prev,
		next,
		onKeydown,
		attachTrack,
		attachSlideBody
	};
}
