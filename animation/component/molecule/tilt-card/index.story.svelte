<script lang="ts">
	import HtmlButton from '$stylist/html/component/atom/button/index.svelte';
	import HtmlH2 from '$stylist/html/component/atom/h2/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlArticle from '$stylist/html/component/organism/article/index.svelte';
	import TiltCard from '$stylist/animation/component/molecule/tilt-card/index.svelte';
	import type { RecipeTiltCard } from '$stylist/animation/interface/recipe/tilt-card';

	let args: RecipeTiltCard = $props();
</script>

<TiltCard {...args} class="c-tilt-card-story">
	<HtmlArticle class="c-tilt-card-story__content">
		<HtmlH2>Tilt card</HtmlH2>
		<HtmlP>Move your pointer across this card.</HtmlP>
		<HtmlButton type="button" class="c-tilt-card-story__button">Focusable content</HtmlButton>
	</HtmlArticle>
</TiltCard>

<style>
	:global {
		.c-tilt-card-story {
			border-radius: var(--radius-4, 1rem);
		}
		.c-tilt-card-story__content {
			max-width: 22rem;
			padding: calc(var(--space-4, 1rem) * 2);
			border-radius: inherit;
			background: linear-gradient(
				135deg,
				var(--color-primary-700, #4338ca),
				var(--color-success-700, #0f766e)
			);
			color: var(--color-text-inverse, #fff);
		}
		.c-tilt-card-story__button {
			padding: calc(var(--space-4, 1rem) * 0.75);
			font: inherit;
		}
	}
</style>
