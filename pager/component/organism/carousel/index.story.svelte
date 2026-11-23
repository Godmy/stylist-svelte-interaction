<script lang="ts">
	import Carousel from '$stylist/pager/component/organism/carousel/index.svelte';

	// Render of index.story.ts: review-like cards, one of them long enough to scroll inside.
	let args: { count?: number; perView?: number; maxDots?: number } = $props();

	const items = $derived(
		Array.from({ length: args.count ?? 12 }, (_, index) => ({
			author: `Гость ${index + 1}`,
			text:
				index === 1
					? 'Очень длинный отзыв. '.repeat(60)
					: 'Отличная экскурсия, гид рассказал много интересного, всё по плану.'
		}))
	);
</script>

<div style:--carousel-per-view={args.perView ?? 1} style:--carousel-slide-max-height="16rem">
	<Carousel
		{items}
		maxDots={args.maxDots ?? 7}
		label="Отзывы"
		slideLabel={(i, n) => `Отзыв ${i + 1} из ${n}`}
	>
		{#snippet slide(item: { author: string; text: string })}
			<article class="_card">
				<strong>{item.author}</strong>
				<p>{item.text}</p>
			</article>
		{/snippet}
	</Carousel>
</div>

<style>
	._card {
		padding: 1rem 1.25rem;
		border: 1px solid #e3ddd2;
		border-radius: 16px;
		background: #fff;
	}
	._card p {
		margin: 0.5rem 0 0;
		line-height: 1.6;
	}
</style>
