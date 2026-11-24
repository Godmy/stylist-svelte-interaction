<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlImg from '$stylist/html/component/atom/img/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlSection from '$stylist/html/component/organism/section/index.svelte';

	import type { RecipeCarouselZoom } from '$stylist/animation/interface/recipe/carousel-zoom';
	import createCarouselZoomComponentState from '$stylist/animation/component/molecule/carousel-zoom/state.svelte';

	let {
		element = $bindable(null),
		images,
		selectedIndex = $bindable(0),
		onImageSelect,
		label = 'Image gallery',
		previousLabel = 'Previous image',
		nextLabel = 'Next image',
		zoomLabel = 'Zoom image',
		unzoomLabel = 'Reset zoom',
		thumbnailLabel = 'Select image',
		emptyLabel = 'No images',
		zoomEnabled = true,
		zoomScale = 2.5,
		zoomOnHover = true,
		class: className,
		...rest
	}: RecipeCarouselZoom = $props();

	const state = createCarouselZoomComponentState(() => ({
		images: images,
		get selectedIndex() {
			return selectedIndex;
		},
		set selectedIndex(value) {
			selectedIndex = value;
		},
		onImageSelect: onImageSelect,
		zoomEnabled: zoomEnabled,
		zoomScale: zoomScale,
		zoomOnHover: zoomOnHover
	}));
</script>

<HtmlSection bind:element aria-label={label} {...rest} class={['c-carousel-zoom', className]}>
	{#if state.image}
		<HtmlButton
			type="button"
			class="c-carousel-zoom__viewport"
			aria-label={state.zoomed ? unzoomLabel : zoomLabel}
			aria-pressed={state.zoomed}
			disabled={!zoomEnabled}
			onclick={state.toggle}
			onkeydown={state.keydown}
			onpointermove={state.move}
			onpointerleave={state.leave}
			onpointercancel={state.leave}
		>
			<HtmlImg
				class="c-carousel-zoom__image"
				src={state.zoomed ? (state.image.zoomSrc ?? state.image.src) : state.image.src}
				alt={state.image.alt}
				draggable="false"
				style={`transform: scale(${state.zoomed ? state.safeZoomScale : 1}); transform-origin: ${state.position.x * 100}% ${state.position.y * 100}%`}
			/>
		</HtmlButton>
		<HtmlDiv class="c-carousel-zoom__navigation">
			<HtmlButton
				type="button"
				class="c-carousel-zoom__step"
				aria-label={previousLabel}
				disabled={state.resolvedIndex <= 0}
				onclick={() => state.select(state.resolvedIndex - 1)}
			>
				‹
			</HtmlButton>
			<HtmlSpan role="status" aria-live="polite" aria-atomic="true">
				{state.resolvedIndex + 1} / {images.length}
			</HtmlSpan>
			<HtmlButton
				type="button"
				class="c-carousel-zoom__step"
				aria-label={nextLabel}
				disabled={state.resolvedIndex >= images.length - 1}
				onclick={() => state.select(state.resolvedIndex + 1)}
			>
				›
			</HtmlButton>
		</HtmlDiv>
		<HtmlDiv class="c-carousel-zoom__thumbnails" role="group" aria-label={label}>
			{#each images as item, index (index)}
				<HtmlButton
					type="button"
					class="c-carousel-zoom__thumbnail"
					aria-label={`${thumbnailLabel} ${index + 1}: ${item.alt}`}
					aria-pressed={index === state.resolvedIndex}
					onclick={() => state.select(index)}
				>
					<HtmlImg src={item.thumbnail ?? item.src} alt="" loading="lazy" draggable="false" />
				</HtmlButton>
			{/each}
		</HtmlDiv>
	{:else}
		<HtmlP role="status">{emptyLabel}</HtmlP>
	{/if}
</HtmlSection>

<style>
	:global {
		.c-carousel-zoom {
			--c-carousel-zoom-accent: var(
				--carousel-zoom-accent,
				var(--color-border-accent, var(--color-primary-600, #2563eb))
			);
			display: grid;
			gap: var(--carousel-zoom-gap, calc(var(--space-4, 1rem) * 0.75));
			min-width: 0;
			color: var(--color-text-primary);
		}
		.c-carousel-zoom button {
			color: inherit;
			font: inherit;
		}
		.c-carousel-zoom button:focus-visible {
			outline: var(--focus-width, 2px) solid var(--c-carousel-zoom-accent);
			outline-offset: calc(var(--focus-offset, 0.125rem) + 1px);
		}
		.c-carousel-zoom__viewport {
			display: block;
			width: 100%;
			padding: 0;
			overflow: hidden;
			border: 0;
			border-radius: var(--carousel-zoom-radius, var(--radius-2, 0.5rem));
			background: var(--carousel-zoom-background, var(--color-background-secondary));
			cursor: zoom-in;
		}
		.c-carousel-zoom__viewport[aria-pressed='true'] {
			cursor: zoom-out;
		}
		.c-carousel-zoom__viewport:disabled {
			cursor: default;
		}
		.c-carousel-zoom__image {
			display: block;
			width: 100%;
			height: auto;
			transition: transform 160ms ease;
		}
		.c-carousel-zoom__navigation {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: calc(var(--space-4, 1rem) / 2);
		}
		.c-carousel-zoom__step {
			min-width: 2.75rem;
			min-height: 2.75rem;
			border: var(--border-width-thin, 1px) solid currentColor;
			border-radius: var(--radius-1-5, 0.375rem);
			background: transparent;
			cursor: pointer;
		}
		.c-carousel-zoom__step:disabled {
			opacity: var(--opacity-40, 0.35);
			cursor: default;
		}
		.c-carousel-zoom__thumbnails {
			display: flex;
			gap: calc(var(--space-4, 1rem) / 2);
			overflow-x: auto;
			padding: calc(var(--space-4, 1rem) / 4);
		}
		.c-carousel-zoom__thumbnail {
			flex: 0 0 var(--carousel-zoom-thumbnail-size, 4rem);
			padding: 0.125rem;
			border: var(--border-width-medium, 2px) solid transparent;
			border-radius: var(--radius-1-5, 0.375rem);
			background: transparent;
			cursor: pointer;
		}
		.c-carousel-zoom__thumbnail[aria-pressed='true'] {
			border-color: var(--c-carousel-zoom-accent);
		}
		.c-carousel-zoom__thumbnail img {
			display: block;
			width: 100%;
			aspect-ratio: 1;
			object-fit: cover;
			border-radius: var(--radius-0-5, 0.125rem);
		}
		@media (prefers-reduced-motion: reduce) {
			.c-carousel-zoom__image {
				transition: none;
			}
		}
	}
</style>
