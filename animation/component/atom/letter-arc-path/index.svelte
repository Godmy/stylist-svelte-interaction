<script lang="ts">
	import type { RecipeLetterArcPath } from '$stylist/animation/interface/recipe/letter-arc-path';

	let {
		points,
		width = 720,
		height = 360,
		progress = 0,
		class: className = ''
	}: RecipeLetterArcPath = $props();

	const pointList = $derived(points.map((point) => `${point.x},${point.y}`).join(' '));
	const lineLength = $derived(
		points.slice(1).reduce((total, point, index) => {
			const previous = points[index];
			return total + Math.hypot(point.x - previous.x, point.y - previous.y);
		}, 0)
	);
	const clampedProgress = $derived(Math.min(1, Math.max(0, progress)));
</script>

<svg
	class={`c-letter-arc-path ${className}`}
	viewBox={`0 0 ${width} ${height}`}
	aria-hidden="true"
	focusable="false"
>
	{#if points.length > 1}
		<polyline class="c-letter-arc-path__guide" points={pointList} />
		<polyline
			class="c-letter-arc-path__progress"
			points={pointList}
			pathLength={lineLength}
			stroke-dasharray={lineLength}
			stroke-dashoffset={lineLength * (1 - clampedProgress)}
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
