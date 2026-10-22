<script lang="ts">
	import AnimatedDigit from '$stylist/animation/component/atom/animated-digit/index.svelte';
	import type { RecipeAnimatedDigit } from '$stylist/animation/interface/recipe/animated-digit';

	// Render of index.story.ts: `format` is a function (prefix, rounding, suffix), which args cannot carry.
	let {
		prefix = '',
		suffix = '',
		fontSize = 56,
		color = '#2563eb',
		...args
	}: RecipeAnimatedDigit & {
		prefix?: string;
		suffix?: string;
		fontSize?: number;
		color?: string;
	} = $props();

	const format = (value: number) => `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
	const style = $derived(`font-size:${fontSize}px; line-height:1; color:${color};`);
</script>

<div class="_c1">
	<p class="_c2">Revenue target</p>
	<AnimatedDigit {...args} {format} class="_c3" {style} />
</div>

<style>
	._c1 {
		display: grid;
		gap: 1rem;
		padding: 1.5rem;
		background-color: var(--color-background-secondary);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
	}

	._c2 {
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	._c1 :global(._c3) {
		font-weight: 700;
	}
</style>
