<script lang="ts">
	import AnimatedBackground from '$stylist/animation/component/atom/animated-background/index.svelte';
	import type { RecipeAnimatedBackground } from '$stylist/animation/interface/recipe/animated-background';

	// Render of index.story.ts: the duration/opacity knobs become the component's CSS custom properties and the background needs content to show behind.
	let {
		shapeSeconds = 16,
		orbSeconds = 14,
		particleSeconds = 22,
		shapeOpacity = 45,
		orbOpacity = 50,
		particleOpacity = 32,
		...args
	}: RecipeAnimatedBackground & {
		shapeSeconds?: number;
		orbSeconds?: number;
		particleSeconds?: number;
		shapeOpacity?: number;
		orbOpacity?: number;
		particleOpacity?: number;
	} = $props();

	const style = $derived(
		[
			`--animated-background-shape-duration:${shapeSeconds}s`,
			`--animated-background-orb-duration:${orbSeconds}s`,
			`--animated-background-particle-duration:${particleSeconds}s`,
			`--animated-background-shape-opacity:${shapeOpacity / 100}`,
			`--animated-background-orb-opacity:${orbOpacity / 100}`,
			`--animated-background-particle-opacity:${particleOpacity / 100}`
		].join('; ')
	);
</script>

<AnimatedBackground {...args} class={args.class || undefined} {style}>
	<div class="_c1">
		<div class="_c2">
			<p class="_c3">Animated Background</p>
			<p class="_c4">Ambient motion tuned by duration and opacity controls.</p>
		</div>
	</div>
</AnimatedBackground>

<style>
	._c1 {
		display: grid;
		min-height: 18rem;
		place-items: center;
		padding: 2rem;
	}

	._c2 {
		display: grid;
		max-width: 28rem;
		gap: 0.75rem;
		padding: 1.25rem 1.5rem;
		text-align: center;
		background: color-mix(in srgb, var(--color-background-primary) 78%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-border-primary) 70%, transparent);
		border-radius: 0.5rem;
		box-shadow: 0 1rem 2.5rem color-mix(in srgb, var(--color-text-primary) 12%, transparent);
		backdrop-filter: blur(16px);
	}

	._c3 {
		color: var(--color-text-primary);
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 2rem;
	}

	._c4 {
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
</style>
