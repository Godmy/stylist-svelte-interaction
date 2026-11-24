<script lang="ts">
	import type { RecipeMarqueeTicker } from '$stylist/animation/interface/recipe/marquee-ticker';

	import createMarqueeTickerComponentState from '$stylist/animation/component/atom/marquee-ticker/state.svelte';

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

	const state = createMarqueeTickerComponentState(() => ({
		items: items,
		separator: separator,
		speedSeconds: speedSeconds,
		startPosition: startPosition,
		letterTransitionMs: letterTransitionMs,
		still: still
	}));
	const lettersFromBackground = $derived(state.lettersFromBackground);
	const lettersIntoBackground = $derived(state.lettersIntoBackground);
</script>

{#if state.text}
	<div
		class={`c-marquee-ticker c-marquee-ticker--appear-${appearEffect} c-marquee-ticker--disappear-${disappearEffect} ${upsideDown ? 'c-marquee-ticker--upside-down' : ''} ${className}`}
		style:--marquee-ticker-duration={`${state.duration}s`}
		style:--marquee-ticker-edge-start={`${100 - state.startProgress}vw`}
		style:--marquee-ticker-loop-start={`${state.startProgress * -0.5}%`}
		style:--marquee-ticker-background={backgroundColor}
		style:--marquee-ticker-color={textColor}
		style:--marquee-ticker-height={height}
		style:--marquee-ticker-font-size={fontSize}
		style:--marquee-ticker-letter-transition-color={letterTransitionColor}
	>
		{#key state.text}
			<div
				class="c-marquee-ticker__layer"
				in:lettersFromBackground={{ duration: state.transitionDuration }}
				out:lettersIntoBackground={{ duration: state.transitionDuration }}
			>
				<div
					class="c-marquee-ticker__track"
					class:c-marquee-ticker__track--animated={state.animated}
				>
					<span class="c-marquee-ticker__group">
						{#each state.repeats as item, itemIndex (itemIndex)}
							<span class="c-marquee-ticker__item">{item}</span>
						{/each}
					</span>
					{#if state.animated}
						<span class="c-marquee-ticker__group" aria-hidden="true">
							{#each state.repeats as item, itemIndex2 (itemIndex2)}
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
				calc(var(--marquee-ticker-edge-start, 100vw) + var(--marquee-ticker-loop-start, 0%))
			);
		}

		to {
			transform: translateX(
				calc(var(--marquee-ticker-edge-start, 100vw) + var(--marquee-ticker-loop-start, 0%) - 50%)
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
