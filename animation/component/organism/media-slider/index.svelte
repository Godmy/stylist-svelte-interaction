<script lang="ts">
	import type { RecipeMediaSlider } from '$stylist/animation/interface/recipe/media-slider';
	import createMediaSliderState from './state.svelte';
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import BeachWater from '$stylist/animation/component/atom/beach-water/index.svelte';
	import MarqueeTicker from '$stylist/animation/component/atom/marquee-ticker/index.svelte';
	import { createStickyScrollProgress } from '$stylist/animation/function/state/sticky-scroll-progress';

	let props: RecipeMediaSlider = $props();
	const state = createMediaSliderState(() => props);
	const scroll = createStickyScrollProgress();

	// Extra scroll distance (beyond the slider's own 100svh) the visitor has
	// to scroll through, pinned, before the wave below fully covers the
	// screen and the pin releases into whatever comes after the slider.
	const WAVE_REVEAL_VH = 60;
	const scrollReveal = $derived(props.scrollReveal ?? true);
	const showTicker = $derived(props.showTicker ?? true);

	// Complete each dissolve before applying another navigation request.
	// Otherwise a half-visible incoming layer could become the background.
	function syncSlideTransition(node: HTMLDivElement, active: boolean) {
		let timer: ReturnType<typeof setTimeout> | undefined;
		let frame = 0;
		function finishWhenOpaque() {
			if (Number(getComputedStyle(node).opacity) === 1) state.finishTransition();
			else frame = requestAnimationFrame(finishWhenOpaque);
		}
		function apply(isActive: boolean) {
			clearTimeout(timer);
			cancelAnimationFrame(frame);
			if (!isActive) return;
			const style = getComputedStyle(node);
			const durations = style.transitionDuration.split(',');
			const delays = style.transitionDelay.split(',');
			const duration = Math.max(...durations.map((value, index) =>
				(parseFloat(value) + parseFloat(delays[index % delays.length])) * 1000
			));
			timer = setTimeout(finishWhenOpaque, duration);
		}
		apply(active);
		return {
			update: apply,
			destroy: () => {
				clearTimeout(timer);
				cancelAnimationFrame(frame);
			}
		};
	}

	// Toggling the `autoplay` attribute after a <video> is already mounted
	// doesn't (re)start playback in browsers — it's only honored when the
	// element first loads its resource. Since every slide is mounted upfront
	// (just hidden via opacity), a video slide that becomes active later
	// needs an explicit .play()/.pause() call instead.
	function syncVideoPlayback(node: HTMLVideoElement, isActive: boolean) {
		function apply(active: boolean) {
			if (active) node.play().catch(() => {});
			else node.pause();
		}
		apply(isActive);
		return {
			update: apply
		};
	}
</script>

<div
	class="c-media-slider-scroll"
	style:height={scrollReveal
		? `calc(var(--c-media-slider-height, 100svh) + ${WAVE_REVEAL_VH}vh)`
		: 'var(--c-media-slider-height, 100svh)'}
	use:scroll.track
>
<section
	class={state.containerClass}
	aria-label={props.ariaLabel ?? 'Media slider'}
	aria-roledescription="carousel"
>
	{#each state.slides as slide, index (slide.id)}
		<div
			class="c-media-slider__slide"
			class:c-media-slider__slide--media={slide.type === 'image' || slide.type === 'video'}
			class:c-media-slider__slide--active={index === state.currentIndex}
			aria-hidden={index !== state.currentIndex}
			use:syncSlideTransition={index === state.currentIndex}
		>
			{#if slide.type === 'video'}
				<video
					class="c-media-slider__media"
					src={slide.src}
					poster={slide.poster}
					muted
					playsinline
					disablepictureinpicture
					disableremoteplayback
					controlsList="nofullscreen noremoteplayback nodownload"
					loop={state.slides.length === 1}
					use:syncVideoPlayback={index === state.currentIndex}
					onended={() => state.handleVideoEnded(index)}
					onloadeddata={() => state.markLoaded(index)}
					onerror={() => state.markLoaded(index)}
					aria-label={slide.alt}
				></video>
			{:else if slide.type === 'image'}
				<img
					class="c-media-slider__media"
					src={slide.src}
					alt={slide.alt ?? ''}
					loading="eager"
					onload={() => state.markLoaded(index)}
					onerror={() => state.markLoaded(index)}
				/>
			{:else if slide.type === 'form'}
				<div class="c-media-slider__form">
					{@render props.formContent?.()}
				</div>
			{:else}
				<div class="c-media-slider__hero">
					{@render props.heroContent?.({
						next: state.next,
						markLoaded: () => state.markLoaded(index),
						setAtRest: state.setHeroAtRest
					})}
				</div>
			{/if}
			{#if slide.type !== 'form' && !state.isLoaded(index)}
				<div class="c-media-slider__skeleton" aria-hidden="true">
					{#if slide.type === 'hero'}
						<span class="c-media-slider__skeleton-label">Открываем остров Шри-Ланка для вас</span>
					{/if}
				</div>
			{/if}
			{#if slide.type !== 'form' && slide.type !== 'hero'}
				<div class="c-media-slider__shade" aria-hidden="true"></div>
			{/if}
		</div>
	{/each}

	{#if props.overlayContent}
		<!-- Host content laid over every slide (e.g. a landing's catalogue entry
		     points). The layer itself never takes clicks — only its children do
		     — so the media and nav controls around it stay usable. Fades out
		     with the ticker as the wave rises. -->
		<div class="c-media-slider__overlay" style:opacity={1 - scroll.progress}>
			{@render props.overlayContent()}
		</div>
	{/if}

	{#if state.showControls && state.slides.length > 1}
		<button
			type="button"
			class="c-media-slider__nav c-media-slider__nav--prev"
			onclick={state.prev}
			disabled={state.activeSlide?.type === 'hero' && !state.heroAtRest}
			aria-label="Предыдущий слайд"
		>
			<span class="c-media-slider__nav-icon c-media-slider__nav-icon--flip">
				<BaseIcon name="chevron-right" size={28} />
			</span>
		</button>
		<button
			type="button"
			class="c-media-slider__nav c-media-slider__nav--next"
			onclick={state.next}
			disabled={state.activeSlide?.type === 'hero' && !state.heroAtRest}
			aria-label="Следующий слайд"
		>
			<span class="c-media-slider__nav-icon">
				<BaseIcon name="chevron-right" size={28} />
			</span>
		</button>
	{/if}

	{#if state.showIndicators && state.slides.length > 1}
		<div class="c-media-slider__indicators" role="tablist" aria-label="Слайды">
			{#each state.slides as slide, index (slide.id)}
				<button
					type="button"
					class="c-media-slider__indicator"
					class:c-media-slider__indicator--active={index === state.currentIndex}
					onclick={() => state.goTo(index)}
					disabled={state.activeSlide?.type === 'hero' && !state.heroAtRest}
					role="tab"
					aria-selected={index === state.currentIndex}
					aria-label={`Слайд ${index + 1}`}
				></button>
			{/each}
		</div>
	{/if}

	{#if showTicker && state.activeSlide && state.activeSlide.type !== 'form' && state.activeSlide.caption && state.isLoaded(state.currentIndex) && (state.activeSlide.type !== 'hero' || state.heroAtRest)}
		<div class="c-media-slider__ticker" style:opacity={1 - scroll.progress}>
			<MarqueeTicker
				items={[state.activeSlide.caption]}
				speedSeconds={Math.max(28, state.activeSlide.caption.length * 0.55)}
				startPosition={100}
				height="100%"
				fontSize="inherit"
				textColor="currentColor"
				letterTransitionColor="rgba(14, 23, 20, 0.58)"
				letterTransitionMs={760}
			/>
		</div>
	{/if}

	<!-- Rises from the bottom (where the ticker sits) as the visitor scrolls
	     past the slider (any slide, not just the active one's own internal
	     state), washing the screen white before handing off to whatever comes
	     after the slider. The ticker above fades out in lockstep so the two
	     never fight for the same strip. -->
	{#if scrollReveal}
		<div class="c-media-slider__wave" style:height={`${scroll.progress * 100}%`} aria-hidden="true">
			<BeachWater tone="#ffffff" waveStart={0.14} amplitude={26} layerOffset={12} />
		</div>
	{/if}
</section>
</div>

<style>
	.c-media-slider {
		position: sticky;
		top: 0;
		display: block;
		width: 100%;
		/* A host with an in-flow header above can shrink it to the rest of
		   the screen. */
		height: var(--c-media-slider-height, 100svh);
		overflow: hidden;
		isolation: isolate;
		background: #0e1714;
		outline: none;
	}

	.c-media-slider-scroll {
		position: relative;
	}

	.c-media-slider__slide {
		position: absolute;
		inset: 0;
		opacity: 0;
		/* Every slide stays mounted (see the video-autoplay note above), stacked
		   at the same inset:0 — without this, an inactive slide later in DOM
		   order (e.g. the closing contact-form slide) sits on top for hit-testing
		   despite opacity:0, and silently swallows every click/wheel/touch meant
		   for the active slide underneath (e.g. the hero slide's own scroll-
		   scrubbed morph never receives a single wheel event). */
		pointer-events: none;
		transition: opacity var(--c-media-slider-transition-duration, 800ms) ease;
	}

	.c-media-slider__slide--active {
		opacity: 1;
		pointer-events: auto;
		/* No z-index here on purpose: inactive slides are already invisible
		   via opacity, so they don't need out-stacking; and giving this one a
		   z-index would open a stacking context that traps its own hero
		   content (turtle/wordmark) below the wave's z-index, no matter what
		   z-index they're given internally. See turtle-photo-to-mark and
		   turtle-hero-wordmark, which rely on that NOT happening. */
	}

	.c-media-slider__media {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Keep outgoing media opaque underneath the incoming fade. Fading both
	   layers at once exposes the dark background halfway through a change.
	   Apply stacking only to media: hero content needs its existing stacking
	   relationship with the overlay and wave. Duration can be set by hosts. */
	.c-media-slider__slide--media {
		z-index: 0;
		transition: opacity 0s linear var(--c-media-slider-transition-duration, 800ms);
	}

	.c-media-slider__slide--media.c-media-slider__slide--active {
		z-index: 1;
		transition: opacity var(--c-media-slider-transition-duration, 800ms) ease;
	}

	.c-media-slider__form {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		overflow-y: hidden;
		padding: 4rem 1.25rem;
		background: #0e1714;
	}

	.c-media-slider__slide--active .c-media-slider__form {
		overflow-y: auto;
	}

	.c-media-slider__hero {
		position: absolute;
		inset: 0;
	}

	.c-media-slider__skeleton {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		background: linear-gradient(
			100deg,
			#0e1714 40%,
			#1c2b26 50%,
			#0e1714 60%
		);
		background-size: 200% 100%;
		animation: c-media-slider-shimmer 1.6s ease-in-out infinite;
		/* Sibling of .c-media-slider__hero, rendered after it in the markup —
		   at the same (auto) z-index, later DOM order paints on top, which
		   without this would silently swallow every wheel/touch event meant
		   for the hero slide's own scroll-driven morph (they're siblings, not
		   ancestor/descendant, so the event would never even bubble there). */
		pointer-events: none;
	}

	.c-media-slider__skeleton-label {
		color: rgba(255, 255, 255, 0.7);
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	@media (prefers-reduced-motion: reduce) {
		.c-media-slider__skeleton {
			animation: none;
		}
	}

	@keyframes c-media-slider-shimmer {
		from {
			background-position: 100% 0;
		}

		to {
			background-position: -100% 0;
		}
	}

	.c-media-slider__shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.42), transparent 46%);
		pointer-events: none;
	}

	.c-media-slider__nav {
		position: absolute;
		top: 50%;
		z-index: 2;
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border: 0;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.16);
		color: #fff;
		cursor: pointer;
		backdrop-filter: blur(6px);
		transform: translateY(-50%);
		transition: background 180ms ease;
	}

	.c-media-slider__nav:hover {
		background: rgba(255, 255, 255, 0.28);
	}

	.c-media-slider__nav:disabled,
	.c-media-slider__indicator:disabled {
		opacity: 0.35;
		cursor: default;
		pointer-events: none;
	}

	.c-media-slider__nav--prev {
		left: 1.25rem;
	}

	.c-media-slider__nav--next {
		right: 1.25rem;
	}

	.c-media-slider__nav-icon {
		display: inline-flex;
	}

	.c-media-slider__nav-icon--flip {
		transform: scaleX(-1);
	}

	.c-media-slider__indicators {
		position: absolute;
		left: 50%;
		/* sits above the ticker bar (see __ticker below), never on top of it */
		bottom: calc(var(--tc-slider-ticker-height, 4.6rem) + 1.1rem);
		z-index: 2;
		display: flex;
		gap: 0.5rem;
		transform: translateX(-50%);
	}

	.c-media-slider__indicator {
		width: 0.55rem;
		height: 0.55rem;
		padding: 0;
		border: 0;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.4);
		cursor: pointer;
		transition: background 180ms ease;
	}

	.c-media-slider__indicator--active {
		background: #fff;
	}

	.c-media-slider__overlay {
		position: absolute;
		inset: 0 0 var(--tc-slider-ticker-height, 4.6rem);
		z-index: 2;
		pointer-events: none;
		transition: opacity 240ms ease-out;
	}

	.c-media-slider__overlay > :global(*) {
		pointer-events: auto;
	}

	/* Running-line strip that closes the slider at the bottom — fades out as
	   the wave below rises to take its place (see __wave), and back in as the
	   visitor scrolls back up to rest. */
	.c-media-slider__ticker {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 2;
		height: var(--tc-slider-ticker-height, 4.6rem);
		display: flex;
		align-items: center;
		background: rgba(14, 23, 20, 0.58);
		backdrop-filter: blur(6px);
		color: #fff;
		font-size: 4rem;
		font-weight: 800;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		pointer-events: none;
		transition: opacity 240ms ease-out;
	}

	@media (max-width: 640px) {
		.c-media-slider__ticker {
			font-size: 1.5rem;
			height: 3.8rem;
		}
	}

	/* Rises from the bottom as the visitor scrolls the real page through
	   MediaSlider's own extra (WAVE_REVEAL_VH) scroll height — see
	   c-media-slider-scroll above. Sits above everything else in the slider,
	   including the nav/indicators, since by the time it's tall enough to
	   matter the visitor is already leaving this section. */
	.c-media-slider__wave {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 3;
		overflow: hidden;
		pointer-events: none;
		transition: height 240ms ease-out;
	}

	.c-media-slider__wave :global(.c-beach-water) {
		position: absolute;
		inset: 0;
		height: 100%;
	}

	@media (prefers-reduced-motion: reduce) {
		.c-media-slider__overlay,
		.c-media-slider__ticker,
		.c-media-slider__wave {
			transition: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.c-media-slider__slide,
		.c-media-slider__slide--media.c-media-slider__slide--active {
			transition: none;
		}
	}
</style>
