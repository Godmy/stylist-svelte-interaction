<script lang="ts">
	import type { RecipeBeachWater } from '$stylist/animation/interface/recipe/beach-water';
	import { createMotionPreferenceState } from '$stylist/animation/function/state/motion-preference';

	let {
		tone,
		backColor,
		middleColor = '#ffffff',
		frontColor = '#ffffff',
		waveStart = 0.46,
		amplitude = 44,
		layerOffset = 18,
		still = false,
		class: className = ''
	}: RecipeBeachWater = $props();

	const motionPreference = createMotionPreferenceState();
	const animated = $derived(!still && !motionPreference.prefersReducedMotion);
	const resolvedBackColor = $derived(backColor ?? tone ?? '#ffffff');
	const resolvedWaveStart = $derived(Math.min(Math.max(waveStart, 0.08), 0.92) * 160);
	const resolvedAmplitude = $derived(Math.min(Math.max(amplitude, 6), 80));
	const resolvedLayerOffset = $derived(Math.min(Math.max(layerOffset, 0), 54));
	const backY = $derived(resolvedWaveStart);
	const middleY = $derived(Math.min(resolvedWaveStart + resolvedLayerOffset, 154));
	const frontY = $derived(Math.min(resolvedWaveStart + resolvedLayerOffset * 2, 158));
	const backPath = $derived(
		`M-600 ${backY} C-500 ${backY - resolvedAmplitude} -420 ${backY - resolvedAmplitude} -320 ${backY} S-140 ${backY + resolvedAmplitude} -40 ${backY} S140 ${backY - resolvedAmplitude} 240 ${backY} S420 ${backY + resolvedAmplitude} 520 ${backY} S700 ${backY - resolvedAmplitude} 800 ${backY} S980 ${backY + resolvedAmplitude} 1080 ${backY} S1260 ${backY - resolvedAmplitude} 1360 ${backY} V160 H-600 Z`
	);
	const middlePath = $derived(
		`M-600 ${middleY} C-480 ${middleY - resolvedAmplitude * 0.78} -400 ${middleY - resolvedAmplitude * 0.78} -280 ${middleY} S-80 ${middleY + resolvedAmplitude * 0.78} 40 ${middleY} S240 ${middleY - resolvedAmplitude * 0.78} 360 ${middleY} S560 ${middleY + resolvedAmplitude * 0.78} 680 ${middleY} S880 ${middleY - resolvedAmplitude * 0.78} 1000 ${middleY} S1200 ${middleY + resolvedAmplitude * 0.78} 1320 ${middleY} V160 H-600 Z`
	);
	const frontPath = $derived(
		`M-600 ${frontY} C-450 ${frontY - resolvedAmplitude * 0.6} -360 ${frontY - resolvedAmplitude * 0.6} -210 ${frontY} S30 ${frontY + resolvedAmplitude * 0.6} 180 ${frontY} S420 ${frontY - resolvedAmplitude * 0.6} 570 ${frontY} S810 ${frontY + resolvedAmplitude * 0.6} 960 ${frontY} S1200 ${frontY - resolvedAmplitude * 0.6} 1350 ${frontY} V160 H-600 Z`
	);
</script>

<svg
	class={`c-beach-water ${animated ? 'c-beach-water--animated' : ''} ${className}`}
	style:--beach-water-back={resolvedBackColor}
	style:--beach-water-middle={middleColor}
	style:--beach-water-front={frontColor}
	viewBox="0 0 600 160"
	preserveAspectRatio="none"
	aria-hidden="true"
	focusable="false"
>
	<path class="c-beach-water__band c-beach-water__band--1" d={backPath} />
	<path class="c-beach-water__band c-beach-water__band--2" d={middlePath} />
	<path class="c-beach-water__band c-beach-water__band--3" d={frontPath} />
</svg>

<style>
	.c-beach-water {
		display: block;
		width: 100%;
		height: var(--beach-water-height, 10rem);
		overflow: visible;
	}

	.c-beach-water__band {
		transform-box: fill-box;
		transform-origin: center;
	}

	.c-beach-water__band--1 {
		fill: var(--beach-water-back, #ffffff);
		opacity: 0.68;
	}
	.c-beach-water__band--2 {
		fill: var(--beach-water-middle, #ffffff);
		opacity: 0.86;
	}
	.c-beach-water__band--3 {
		fill: var(--beach-water-front, #ffffff);
		opacity: 1;
	}

	.c-beach-water--animated .c-beach-water__band {
		animation: beach-water-drift 9s ease-in-out infinite;
	}
	.c-beach-water--animated .c-beach-water__band--2 {
		animation-delay: -2.2s;
		animation-duration: 11s;
	}
	.c-beach-water--animated .c-beach-water__band--3 {
		animation-delay: -4.4s;
		animation-duration: 13s;
	}

	@keyframes beach-water-drift {
		0%,
		100% {
			transform: translateX(-7%);
		}
		50% {
			transform: translateX(7%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.c-beach-water__band {
			animation: none !important;
		}
	}
</style>
