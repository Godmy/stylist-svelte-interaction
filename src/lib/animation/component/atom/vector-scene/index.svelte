<script lang="ts">
	import type { RecipeVectorScene } from '$stylist/animation/interface/recipe/vector-scene';
	import createVectorSceneState from './state.svelte';

	let props: RecipeVectorScene = $props();
	const state = createVectorSceneState(() => props);
</script>

<svg
	class={state.classes}
	viewBox={state.viewBox}
	preserveAspectRatio="xMidYMid meet"
	aria-hidden="true"
	focusable="false"
	{...state.restProps}
	onmouseenter={state.handleMouseEnter}
	onmouseleave={state.handleMouseLeave}
	onmousedown={state.handleMouseDown}
	onmouseup={state.handleMouseUp}
>
	{#each state.layers as layer, index (layer.id)}
		<path
			class="c-vector-scene__layer"
			style={`animation-delay: ${index * 0.6}s; ${state.layerStyle(layer) ?? ''}`}
			d={layer.d}
			fill={layer.fill ?? 'currentColor'}
			stroke={layer.stroke}
			stroke-width={layer.strokeWidth}
		/>
	{/each}
</svg>

<style>
	.c-vector-scene {
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
		pointer-events: none;
	}

	.c-vector-scene--interaction {
		pointer-events: auto;
	}

	.c-vector-scene__layer {
		color: var(--vector-scene-color, var(--color-primary-500));
		transform-box: fill-box;
		transform-origin: center;
	}

	.c-vector-scene--ambient .c-vector-scene__layer {
		animation: vector-scene-drift var(--vector-scene-duration, 6s) ease-in-out infinite;
	}

	.c-vector-scene--reduced .c-vector-scene__layer {
		animation: none;
		transform: none;
		transition: none;
	}

	@keyframes vector-scene-drift {
		0%,
		100% {
			transform: translateY(0) scale(1);
			opacity: 0.85;
		}
		50% {
			transform: translateY(-18%) scale(1.05);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.c-vector-scene__layer {
			animation: none;
			transform: none;
			transition: none;
		}
	}
</style>
