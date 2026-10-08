<script lang="ts">
	import type { RecipeArcLetter } from '$stylist/animation/interface/recipe/arc-letter';

	let {
		character,
		x,
		y,
		opacity = 1,
		rotation = 0,
		scale = 1,
		highlight = 0,
		class: className = ''
	}: RecipeArcLetter = $props();
</script>

<span
	class={`c-arc-letter ${className}`}
	style:left={`${x}px`}
	style:top={`${y}px`}
	style:opacity={opacity}
	style:transform={`translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`}
	style:--arc-letter-highlight={highlight}
>
	{character}
</span>

<style>
	.c-arc-letter {
		position: absolute;
		display: inline-grid;
		place-items: center;
		min-width: 0.72em;
		font-weight: 800;
		line-height: 1;
		color: color-mix(
			in srgb,
			var(--arc-letter-color, #0f352f) calc(100% - 28% * var(--arc-letter-highlight, 0)),
			#fff2a8 calc(28% * var(--arc-letter-highlight, 0))
		);
		-webkit-text-stroke: calc(0.012em + 0.018em * var(--arc-letter-highlight, 0))
			rgb(4 35 31 / 0.36);
		text-shadow:
			0 0.07em 0.12em rgb(255 255 255 / 0.74),
			0 0 calc(0.12em + 0.24em * var(--arc-letter-highlight, 0))
				rgb(255 236 140 / calc(0.34 + 0.5 * var(--arc-letter-highlight, 0))),
			0 0 calc(0.28em + 0.68em * var(--arc-letter-highlight, 0))
				rgb(46 199 174 / calc(0.22 + 0.46 * var(--arc-letter-highlight, 0))),
			0 0 calc(0.56em + 0.92em * var(--arc-letter-highlight, 0))
				rgb(255 190 78 / calc(0.1 + 0.26 * var(--arc-letter-highlight, 0)));
		filter: brightness(calc(1 + 0.26 * var(--arc-letter-highlight, 0)))
			saturate(calc(1 + 0.36 * var(--arc-letter-highlight, 0)));
		will-change: transform, opacity;
		pointer-events: none;
	}

	.c-arc-letter::before {
		content: '';
		position: absolute;
		z-index: -1;
		width: 1.22em;
		height: 1.22em;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			rgb(255 236 145 / calc(0.34 * var(--arc-letter-highlight, 0))) 0 26%,
			rgb(57 211 185 / calc(0.2 * var(--arc-letter-highlight, 0))) 44%,
			transparent 72%
		);
		transform: scale(calc(0.82 + 0.42 * var(--arc-letter-highlight, 0)));
		filter: blur(0.06em);
	}
</style>
