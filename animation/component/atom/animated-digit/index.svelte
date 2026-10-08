<script lang="ts">
	import type { RecipeAnimatedDigit } from '$stylist/animation/interface/recipe/animated-digit';
	import createAnimatedDigitState from './state.svelte';

	let props: RecipeAnimatedDigit = $props();
	const state = createAnimatedDigitState(() => props);
</script>

<!-- Inline, so it can sit inside a sentence or a <p> («740 $ за 3 чел.»). -->
<span class={state.classes} style={state.inlineStyle}>
	{#if state.children}
		{@render state.children()}
	{:else}
		{state.formattedValue}
	{/if}
</span>

<style>
	.c-animated-digit {
		font-variant-numeric: tabular-nums;
	}

	.c-animated-digit--infinite {
		animation-iteration-count: infinite;
	}
</style>
