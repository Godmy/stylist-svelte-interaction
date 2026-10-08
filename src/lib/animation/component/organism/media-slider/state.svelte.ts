import { ClassNamesManager } from '$stylist/layout/class/manager/class-names';
import { createMotionPreferenceState } from '$stylist/animation/function/state/motion-preference';
import type { RecipeMediaSlider } from '$stylist/animation/interface/recipe/media-slider';

export function createMediaSliderState(getProps: () => RecipeMediaSlider) {
	const props = $derived(getProps());
	const motionPreference = createMotionPreferenceState();

	let currentIndex = $state(0);
	let pendingIndex = $state<number | null>(null);
	let transitioning = false;
	let loadedIndexes = $state(new Set<number>());
	let heroAtRest = $state(true);
	const slides = $derived(props.slides ?? []);
	const autoPlay = $derived(props.autoPlay ?? true);
	const autoPlayInterval = $derived(props.autoPlayInterval ?? 6000);
	const showControls = $derived(props.showControls ?? true);
	const showIndicators = $derived(props.showIndicators ?? true);
	const activeSlide = $derived(slides[currentIndex]);

	const containerClass = $derived(
		ClassNamesManager.merge(
			'c-media-slider',
			typeof props.class === 'string' ? props.class : undefined
		)
	);

	function next() {
		if (slides.length === 0) return;
		goTo(((pendingIndex ?? currentIndex) + 1) % slides.length);
	}

	function prev() {
		if (slides.length === 0) return;
		goTo(((pendingIndex ?? currentIndex) - 1 + slides.length) % slides.length);
	}

	function goTo(index: number) {
		if (index < 0 || index >= slides.length) return;
		if (transitioning) {
			pendingIndex = index;
			return;
		}
		// Keep the current picture visible while the requested media loads.
		// Only the latest navigation request is committed when it is ready.
		const slide = slides[index];
		if ((slide.type === 'image' || slide.type === 'video') && !isLoaded(index)) {
			pendingIndex = index;
			return;
		}
		pendingIndex = null;
		if (index === currentIndex) return;
		const outgoing = slides[currentIndex];
		transitioning = (outgoing?.type === 'image' || outgoing?.type === 'video')
			&& (slide.type === 'image' || slide.type === 'video');
		currentIndex = index;
	}

	function finishTransition() {
		transitioning = false;
		if (pendingIndex !== null) goTo(pendingIndex);
	}

	function handleVideoEnded(index: number) {
		if (index === currentIndex) next();
	}

	function markLoaded(index: number) {
		if (loadedIndexes.has(index)) return;
		loadedIndexes = new Set(loadedIndexes).add(index);
		if (pendingIndex === index) goTo(index);
	}

	function isLoaded(index: number) {
		return loadedIndexes.has(index);
	}

	function setHeroAtRest(visible: boolean) {
		heroAtRest = visible;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') next();
		else if (event.key === 'ArrowLeft') prev();
	}

	// Image slides auto-advance on a timer; video slides advance themselves
	// via handleVideoEnded once playback finishes, so no timer is set for them.
	// The countdown only starts once the active image has actually loaded, so
	// a slow connection can't advance to a slide whose image isn't ready yet.
	$effect(() => {
		const slide = activeSlide;
		if (!autoPlay || !slide || slide.type !== 'image' || slides.length <= 1) return;
		if (motionPreference.prefersReducedMotion) return;
		if (!loadedIndexes.has(currentIndex)) return;

		const timer = window.setInterval(next, slide.durationMs ?? autoPlayInterval);
		return () => window.clearInterval(timer);
	});

	// Notifies the host of every slide change (including the initial one on
	// mount), so it can branch its own content on which slide is active.
	$effect(() => {
		const slide = activeSlide;
		if (!slide) return;
		props.onSlideChange?.({ index: currentIndex, slide, isFirst: currentIndex === 0 });
	});

	return {
		get slides() {
			return slides;
		},
		get currentIndex() {
			return currentIndex;
		},
		get activeSlide() {
			return activeSlide;
		},
		get showControls() {
			return showControls;
		},
		get showIndicators() {
			return showIndicators;
		},
		get containerClass() {
			return containerClass;
		},
		get heroAtRest() {
			return heroAtRest;
		},
		next,
		prev,
		goTo,
		finishTransition,
		markLoaded,
		isLoaded,
		setHeroAtRest,
		handleVideoEnded,
		handleKeyDown
	};
}

export default createMediaSliderState;
