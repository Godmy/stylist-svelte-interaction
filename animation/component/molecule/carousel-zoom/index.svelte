<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlImg from '$stylist/html/component/atom/img/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlSection from '$stylist/html/component/organism/section/index.svelte';
	import { carouselIndex } from '$stylist/animation/function/resolve/carousel-index';
	import { pointerPosition } from '$stylist/animation/function/transform/pointer-position';
	import type { RecipeCarouselZoom } from '$stylist/animation/interface/recipe/carousel-zoom';

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

	const resolvedIndex = $derived(carouselIndex(selectedIndex, images.length));
	const image = $derived(images[resolvedIndex]);
	const safeZoomScale = $derived(
		Number.isFinite(zoomScale) ? Math.min(8, Math.max(1, zoomScale)) : 2.5
	);

	let position = $state({ x: 0.5, y: 0.5 });
	let pinned = $state<string | null>(null);
	let hovered = $state<string | null>(null);

	const zoomed = $derived(
		Boolean(zoomEnabled && image && (pinned === image.src || hovered === image.src))
	);

	function select(index: number) {
		const next = carouselIndex(index, images.length);
		if (next < 0) return;
		pinned = null;
		hovered = null;
		position = { x: 0.5, y: 0.5 };
		selectedIndex = next;
		onImageSelect?.(next);
	}

	function move(event: PointerEvent) {
		if (!zoomEnabled || event.pointerType === 'touch' || !image) return;
		position = pointerPosition(
			event.clientX,
			event.clientY,
			(event.currentTarget as HTMLElement).getBoundingClientRect()
		);
		if (zoomOnHover) hovered = image.src;
	}

	function leave() {
		hovered = null;
	}

	function toggle() {
		if (!zoomEnabled || !image) return;
		pinned = pinned === image.src ? null : image.src;
		hovered = null;
		position = { x: 0.5, y: 0.5 };
	}

	function keydown(event: KeyboardEvent) {
		const target = {
			ArrowLeft: resolvedIndex - 1,
			ArrowRight: resolvedIndex + 1,
			Home: 0,
			End: images.length - 1
		}[event.key];
		if (target !== undefined) {
			event.preventDefault();
			select(target);
		} else if (event.key === 'Escape') {
			pinned = null;
			hovered = null;
		}
	}
</script>

<HtmlSection bind:element aria-label={label} {...rest} class={['c-carousel-zoom', className]}>
	{#if image}
		<HtmlButton
			type="button"
			class="c-carousel-zoom__viewport"
			aria-label={zoomed ? unzoomLabel : zoomLabel}
			aria-pressed={zoomed}
			disabled={!zoomEnabled}
			onclick={toggle}
			onkeydown={keydown}
			onpointermove={move}
			onpointerleave={leave}
			onpointercancel={leave}
		>
			<HtmlImg
				class="c-carousel-zoom__image"
				src={zoomed ? (image.zoomSrc ?? image.src) : image.src}
				alt={image.alt}
				draggable="false"
				style={`transform: scale(${zoomed ? safeZoomScale : 1}); transform-origin: ${position.x * 100}% ${position.y * 100}%`}
			/>
		</HtmlButton>
		<HtmlDiv class="c-carousel-zoom__navigation">
			<HtmlButton
				type="button"
				class="c-carousel-zoom__step"
				aria-label={previousLabel}
				disabled={resolvedIndex <= 0}
				onclick={() => select(resolvedIndex - 1)}
			>
				‹
			</HtmlButton>
			<HtmlSpan role="status" aria-live="polite" aria-atomic="true">
				{resolvedIndex + 1} / {images.length}
			</HtmlSpan>
			<HtmlButton
				type="button"
				class="c-carousel-zoom__step"
				aria-label={nextLabel}
				disabled={resolvedIndex >= images.length - 1}
				onclick={() => select(resolvedIndex + 1)}
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
					aria-pressed={index === resolvedIndex}
					onclick={() => select(index)}
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
