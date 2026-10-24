<script lang="ts">
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import CarouselZoom from '$stylist/animation/component/molecule/carousel-zoom/index.svelte';
	import type { RecipeCarouselZoom } from '$stylist/animation/interface/recipe/carousel-zoom';

	let args: RecipeCarouselZoom = $props();
	// Follows the control and the gallery's own choice alike.
	let selectedIndex = $derived(args.selectedIndex ?? 0);
</script>

<HtmlDiv class="c-carousel-zoom-story">
	<CarouselZoom {...args} bind:selectedIndex />
	<HtmlP>Selected index: {selectedIndex}</HtmlP>
</HtmlDiv>

<style>
	:global(.c-carousel-zoom-story) {
		max-width: 36rem;
		margin-inline: auto;
	}
</style>
