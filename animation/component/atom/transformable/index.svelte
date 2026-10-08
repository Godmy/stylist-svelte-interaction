<script lang="ts">
	import type { RecipeTransformable } from '$stylist/animation/interface/recipe/transformable';
	import createTransformableState from './state.svelte';

	let props: RecipeTransformable = $props();
	const state = createTransformableState(() => props);
</script>

<div
	class={state.classes}
	style={state.containerStyle}
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
	.c-transformable {
		transition: transform var(--duration-300, 300ms) var(--easing-smooth, ease-in-out);
	}

	/* hover transforms are applied via inline style by state function */
</style>
