<script lang="ts">
	import type { RecipeLetterArcPath } from '$stylist/animation/interface/recipe/letter-arc-path';
	import createLetterArcPathComponentState from '$stylist/animation/component/atom/letter-arc-path/state.svelte';

	let {
		points,
		width = 720,
		height = 360,
		progress = 0,
		class: className = ''
	}: RecipeLetterArcPath = $props();

	const state = createLetterArcPathComponentState(() => ({ points: points, progress: progress }));
</script>

<svg
	class={`c-letter-arc-path ${className}`}
	viewBox={`0 0 ${width} ${height}`}
	aria-hidden="true"
	focusable="false"
>
	{#if points.length > 1}
		<polyline class="c-letter-arc-path__guide" points={state.pointList} />
		<polyline
			class="c-letter-arc-path__progress"
			points={state.pointList}
			pathLength={state.lineLength}
			stroke-dasharray={state.lineLength}
			stroke-dashoffset={state.lineLength * (1 - state.clampedProgress)}
		/>
	{/if}
</svg>

<style>
	.c-letter-arc-path {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
		pointer-events: none;
	}

	.c-letter-arc-path__guide,
	.c-letter-arc-path__progress {
		fill: none;
		vector-effect: non-scaling-stroke;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.c-letter-arc-path__guide {
		stroke: var(--letter-arc-path-guide, rgb(17 58 52 / 0.2));
		stroke-width: 2;
		stroke-dasharray: 6 10;
	}

	.c-letter-arc-path__progress {
		stroke: var(--letter-arc-path-progress, #3aa894);
		stroke-width: 3;
		transition: stroke-dashoffset 120ms linear;
	}
</style>
