<script lang="ts">
	import type { RecipeLayoutTransformation } from '$stylist/animation/interface/recipe/layout-transformation';
	import createLayoutTransformationState from './state.svelte';

	let props: RecipeLayoutTransformation = $props();
	const state = createLayoutTransformationState(() => props);
</script>

<div
	class={state.classes}
	style={state.inlineStyle}
	{...state.restProps}
	onmouseenter={state.handleMouseEnter}
	onmouseleave={state.handleMouseLeave}
	onmousedown={state.handleMouseDown}
	onmouseup={state.handleMouseUp}
>
	{#if state.children}
		{@render state.children()}
	{/if}
</div>

<style>
	.c-layout-transformation {
		position: relative;
		display: inline-block;
	}

	.c-layout-transformation--disabled {
		pointer-events: none;
		opacity: 0.5;
	}
</style>
