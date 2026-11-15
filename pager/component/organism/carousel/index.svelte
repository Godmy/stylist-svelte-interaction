<script lang="ts" generics="TItem">
	import { flip } from 'svelte/animate';
	import type { RecipeCarousel } from '$stylist/pager/interface/recipe/carousel';
	import { createCarouselState } from '$stylist/pager/function/state/carousel/state.svelte';

	let props: RecipeCarousel<TItem> = $props();
	const state = createCarouselState(() => props);
</script>

<section class={state.className} aria-roledescription="carousel" {...state.restProps}>
	<!-- The track is the focusable scroll region (axe scrollable-region-focusable): left/right keys page, a slide scrolls itself. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
	<div
		class="carousel__track"
		role="region"
		aria-label={state.label}
		tabindex="0"
		onkeydown={state.onKeydown}
		{@attach state.attachTrack}
	>
		{#each state.items as item, index (index)}
			<div
				class="carousel__slide"
				role="group"
				aria-roledescription="slide"
				aria-label={state.slideLabel(index)}
			>
				<div class="carousel__slide-body" {@attach state.attachSlideBody}>
					{@render props.slide(item, index)}
				</div>
			</div>
		{/each}
	</div>

	{#if state.pages > 1}
		<div class="carousel__controls">
			<div class="carousel__dots">
				{#each state.dots as dot (dot.key)}
					<span class="carousel__dot-cell" animate:flip={{ duration: 260 }}>
						{#if dot.kind === 'dot'}
							<button
								type="button"
								class="carousel__dot"
								data-active={dot.index === state.active}
								data-edge={dot.edge}
								onclick={() => state.goTo(dot.index)}
								aria-label={state.slideLabel(dot.index)}
								aria-current={dot.index === state.active ? 'true' : undefined}
							></button>
						{:else}
							<button
								type="button"
								class="carousel__gap"
								onclick={() => state.goTo(dot.target)}
								aria-label={`${state.slideLabel(dot.target)} (пропущены ${dot.from + 1}–${dot.to + 1})`}
							>
								<i></i><i></i><i></i>
							</button>
						{/if}
					</span>
				{/each}
			</div>
		</div>
		<p class="carousel__status" aria-live="polite">{state.slideLabel(state.active)}</p>
	{/if}
</section>

<style>
	.carousel {
		--_accent: var(--carousel-accent, var(--color-primary-600, #173f35));
		--_gap: var(--carousel-gap, 16px);
		--_per-view: var(--carousel-per-view, 1);
		position: relative;
		min-width: 0;
	}

	.carousel__track {
		display: flex;
		align-items: stretch;
		gap: var(--_gap);
		overflow-x: auto;
		/* overflow-x alone would make the track a vertical scroller too and swallow
		   the mouse wheel; vertical wheel belongs to the page (2026-11-16). */
		overflow-y: hidden;
		overscroll-behavior-x: contain;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;
		/* Focus ring and card shadows stay visible inside the clipped track. */
		padding: 4px;
		margin: -4px;
		scroll-padding-inline: 4px;
	}
	.carousel__track::-webkit-scrollbar {
		display: none;
	}
	.carousel__track:focus-visible {
		outline: 2px solid var(--_accent);
		outline-offset: 2px;
		border-radius: 12px;
	}

	.carousel__slide {
		flex: 0 0 calc((100% - (var(--_per-view) - 1) * var(--_gap)) / var(--_per-view));
		min-width: 0;
		scroll-snap-align: start;
		scroll-snap-stop: always;
		display: flex;
	}

	/* A long slide scrolls inside itself; the fade says there is more. */
	.carousel__slide-body {
		flex: 1 1 auto;
		min-width: 0;
		max-height: var(--carousel-slide-max-height, none);
		overflow-y: auto;
		/* No overscroll containment: a short slide (or a long one scrolled to its
		   end) passes the wheel on to the page. */
		scrollbar-width: thin;
		scrollbar-color: color-mix(in srgb, var(--_accent) 35%, transparent) transparent;
		border-radius: var(--carousel-slide-radius, 16px);
	}
	.carousel__slide-body > :global(*) {
		min-height: 100%;
		box-sizing: border-box;
	}
	.carousel__slide-body[data-overflow='true'][data-at-end='false'] {
		-webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 3.5rem), transparent);
		mask-image: linear-gradient(to bottom, #000 calc(100% - 3.5rem), transparent);
	}

	.carousel__controls {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 16px;
	}

	.carousel__dots {
		display: flex;
		align-items: center;
		gap: 2px;
		min-height: 24px;
	}

	.carousel__dot-cell {
		display: inline-flex;
	}

	.carousel__dot,
	.carousel__gap {
		display: inline-grid;
		place-items: center;
		height: 24px;
		padding: 0 4px;
		border: 0;
		background: none;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}

	.carousel__dot::before {
		content: '';
		display: block;
		width: 8px;
		height: 8px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--_accent) 28%, transparent);
		transition:
			width 280ms cubic-bezier(0.2, 0.8, 0.2, 1),
			background-color 280ms ease,
			transform 280ms ease;
	}
	.carousel__dot[data-edge='true']::before {
		transform: scale(0.7);
	}
	.carousel__dot[data-active='true']::before {
		width: 24px;
		transform: none;
		background: var(--_accent);
	}
	.carousel__dot:hover:not([data-active='true'])::before {
		background: color-mix(in srgb, var(--_accent) 55%, transparent);
	}

	/* «…»: three micro dots that spread out on hover. */
	.carousel__gap {
		grid-auto-flow: column;
		gap: 2px;
		padding: 0 3px;
	}
	.carousel__gap i {
		display: block;
		width: 3px;
		height: 3px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--_accent) 45%, transparent);
		transition:
			transform 220ms ease,
			background-color 220ms ease;
	}
	.carousel__gap:hover i:first-child {
		transform: translateX(-2px);
	}
	.carousel__gap:hover i:last-child {
		transform: translateX(2px);
	}
	.carousel__gap:hover i {
		background: var(--_accent);
	}

	.carousel__dot:focus-visible,
	.carousel__gap:focus-visible {
		outline: 2px solid var(--_accent);
		outline-offset: 1px;
		border-radius: 999px;
	}


	.carousel__status {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}

	@media (prefers-reduced-motion: reduce) {
		.carousel__dot::before,
		.carousel__gap i {
			transition: none;
		}
	}
</style>
