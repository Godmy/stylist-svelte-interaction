<script lang="ts">
	import type { RecipeMarqueeTicker } from '$stylist/animation/interface/recipe/marquee-ticker';
	import { createMotionPreferenceState } from '$stylist/animation/function/state/motion-preference';

	let {
		items,
		separator = '•',
		speedSeconds,
		startPosition = 0,
		backgroundColor = 'transparent',
		textColor = 'currentColor',
		height = 'auto',
		fontSize = 'inherit',
		letterTransitionColor = backgroundColor,
		letterTransitionMs = 620,
		appearEffect = 'fade',
		disappearEffect = 'fade',
		upsideDown = false,
		still = false,
		class: className = ''
	}: RecipeMarqueeTicker = $props();

	const motionPreference = createMotionPreferenceState();
	const REPEATS = 12;
	// The track always renders REPEATS copies of the text (for a seamless loop
	// on short phrases), but scaling the duration by the full REPEATS count
	// reads as too slow on screen. This smaller factor keeps the loop seamless
	// while landing at a comfortable reading pace.
	const PACE = 4;

	const text = $derived(items.filter(Boolean).join(`  ${separator}  `));
	const repeats = $derived(Array.from({ length: REPEATS }, () => text));
	const duration = $derived((speedSeconds ?? Math.max(10, text.length * 0.22)) * PACE);
	const startProgress = $derived(Math.min(100, Math.max(0, startPosition)));
	const animated = $derived(!still && !motionPreference.prefersReducedMotion && text.length > 0);
	const transitionDuration = $derived(motionPreference.prefersReducedMotion ? 0 : letterTransitionMs);

	function lettersFromBackground(_node: Element, params: { duration?: number } = {}) {
		const durationMs = params.duration ?? 620;

		return {
			duration: durationMs,
			css: (t: number) => `
				opacity: ${t};
				filter: blur(${(1 - t) * 0.3}em);
				color: color-mix(in srgb, var(--marquee-ticker-color, currentColor) ${t * 100}%, var(--marquee-ticker-letter-transition-color, transparent));
			`
		};
	}

	function lettersIntoBackground(_node: Element, params: { duration?: number } = {}) {
		const durationMs = params.duration ?? 620;

		return {
			duration: durationMs,
			css: (t: number) => `
				opacity: ${t};
				filter: blur(${(1 - t) * 0.3}em);
				color: color-mix(in srgb, var(--marquee-ticker-color, currentColor) ${t * 100}%, var(--marquee-ticker-letter-transition-color, transparent));
			`
		};
	}
</script>

{#if text}
	<div
		class={`c-marquee-ticker c-marquee-ticker--appear-${appearEffect} c-marquee-ticker--disappear-${disappearEffect} ${upsideDown ? 'c-marquee-ticker--upside-down' : ''} ${className}`}
		style:--marquee-ticker-duration={`${duration}s`}
		style:--marquee-ticker-edge-start={`${100 - startProgress}vw`}
		style:--marquee-ticker-loop-start={`${startProgress * -0.5}%`}
		style:--marquee-ticker-background={backgroundColor}
		style:--marquee-ticker-color={textColor}
		style:--marquee-ticker-height={height}
		style:--marquee-ticker-font-size={fontSize}
		style:--marquee-ticker-letter-transition-color={letterTransitionColor}
	>
		{#key text}
			<div
				class="c-marquee-ticker__layer"
				in:lettersFromBackground={{ duration: transitionDuration }}
				out:lettersIntoBackground={{ duration: transitionDuration }}
			>
				<div class="c-marquee-ticker__track" class:c-marquee-ticker__track--animated={animated}>
					<span class="c-marquee-ticker__group">
						{#each repeats as item}
							<span class="c-marquee-ticker__item">{item}</span>
						{/each}
					</span>
					{#if animated}
						<span class="c-marquee-ticker__group" aria-hidden="true">
							{#each repeats as item}
								<span class="c-marquee-ticker__item">{item}</span>
							{/each}
						</span>
					{/if}
				</div>
			</div>
		{/key}
	</div>
{/if}

<style>
	.c-marquee-ticker {
		display: grid;
		align-items: center;
		overflow: hidden;
		width: 100%;
		min-height: var(--marquee-ticker-height, auto);
		background: var(--marquee-ticker-background, transparent);
		color: var(--marquee-ticker-color, currentColor);
		font-size: var(--marquee-ticker-font-size, inherit);
		line-height: 1;
		transform-origin: center;
		-webkit-mask-image: linear-gradient(
			90deg,
			var(--marquee-ticker-appear-start, transparent) 0%,
			#000 var(--marquee-ticker-appear-stop, 6%),
			#000 var(--marquee-ticker-disappear-start, 94%),
			var(--marquee-ticker-disappear-stop, transparent) 100%
		);
		mask-image: linear-gradient(
			90deg,
			var(--marquee-ticker-appear-start, transparent) 0%,
			#000 var(--marquee-ticker-appear-stop, 6%),
			#000 var(--marquee-ticker-disappear-start, 94%),
			var(--marquee-ticker-disappear-stop, transparent) 100%
		);
	}

	.c-marquee-ticker--upside-down {
		transform: rotate(180deg);
	}

	.c-marquee-ticker__layer {
		display: grid;
		width: 100%;
		min-width: 0;
		grid-area: 1 / 1;
	}

	.c-marquee-ticker__track {
		display: flex;
		flex: none;
		white-space: nowrap;
		transform: translateX(
			calc(var(--marquee-ticker-edge-start, 100vw) + var(--marquee-ticker-loop-start, 0%))
		);
	}

	.c-marquee-ticker__track--animated {
		animation: c-marquee-ticker-scroll var(--marquee-ticker-duration, 24s) linear infinite;
		/* Promotes the track to its own compositor layer up front, so this
		   `transform` animation keeps running smoothly on the compositor
		   thread even while the main thread is busy elsewhere on this page
		   (WebGL turtle scene, backdrop-filter blur, Ken Burns zoom, wave
		   SVG) — without this, a shared/late-promoted layer is more likely
		   to visibly stutter under that load. */
		will-change: transform;
	}

	.c-marquee-ticker:hover .c-marquee-ticker__track--animated {
		animation-play-state: paused;
	}

	.c-marquee-ticker__group {
		display: inline-flex;
		flex: none;
	}

	.c-marquee-ticker__item {
		flex: none;
		padding-inline: 1.25em;
	}

	.c-marquee-ticker--appear-none {
		--marquee-ticker-appear-start: #000;
		--marquee-ticker-appear-stop: 0%;
	}

	.c-marquee-ticker--appear-fade {
		--marquee-ticker-appear-start: transparent;
		--marquee-ticker-appear-stop: 6%;
	}

	.c-marquee-ticker--appear-soft {
		--marquee-ticker-appear-start: transparent;
		--marquee-ticker-appear-stop: 14%;
	}

	.c-marquee-ticker--disappear-none {
		--marquee-ticker-disappear-start: 100%;
		--marquee-ticker-disappear-stop: #000;
	}

	.c-marquee-ticker--disappear-fade {
		--marquee-ticker-disappear-start: 94%;
		--marquee-ticker-disappear-stop: transparent;
	}

	.c-marquee-ticker--disappear-soft {
		--marquee-ticker-disappear-start: 86%;
		--marquee-ticker-disappear-stop: transparent;
	}

	@keyframes c-marquee-ticker-scroll {
		from {
			transform: translateX(
				calc(
					var(--marquee-ticker-edge-start, 100vw) + var(--marquee-ticker-loop-start, 0%)
				)
			);
		}

		to {
			transform: translateX(
				calc(
					var(--marquee-ticker-edge-start, 100vw) + var(--marquee-ticker-loop-start, 0%) -
						50%
				)
			);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.c-marquee-ticker {
			-webkit-mask-image: none;
			mask-image: none;
		}

		.c-marquee-ticker__track {
			animation: none !important;
			white-space: normal;
		}
	}
</style>
