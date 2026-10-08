<script lang="ts">
	import type { RecipeWaveSurf } from '$stylist/animation/interface/recipe/wave-surf';
	import { createMotionPreferenceState } from '$stylist/animation/function/state/motion-preference';

	let {
		tone = '#1a8a86',
		riderTone = '#17231f',
		still = false,
		class: className = ''
	}: RecipeWaveSurf = $props();

	const motionPreference = createMotionPreferenceState();
	const animated = $derived(!still && !motionPreference.prefersReducedMotion);
</script>

<svg
	class={`c-wave-surf ${animated ? 'c-wave-surf--animated' : ''} ${className}`}
	style:--wave-surf-tone={tone}
	style:--wave-surf-rider-tone={riderTone}
	viewBox="0 0 300 160"
	aria-hidden="true"
	focusable="false"
>
	<path
		class="c-wave-surf__wave"
		d="M0 160 L0 118 Q70 60 170 40 Q120 55 132 78 Q210 95 262 128 Q285 144 300 160 Z"
	/>
	<path class="c-wave-surf__foam" d="M10 122 Q80 68 150 42 Q168 39 172 44" fill="none" />
	<g class="c-wave-surf__rider">
		<path class="c-wave-surf__board" d="M80 96 L116 78" fill="none" />
		<path class="c-wave-surf__leg" d="M98 88 L100 78" fill="none" />
		<circle class="c-wave-surf__head" cx="101" cy="73" r="4" />
	</g>
</svg>

<style>
	.c-wave-surf {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
		color: var(--wave-surf-tone, #1a8a86);
	}

	.c-wave-surf__wave {
		fill: currentColor;
		transform-origin: 57% 25%;
	}

	.c-wave-surf__foam {
		stroke: color-mix(in srgb, white 82%, var(--wave-surf-tone, #1a8a86));
		stroke-width: 3;
		stroke-linecap: round;
		opacity: 0.85;
	}

	.c-wave-surf__board {
		stroke: var(--wave-surf-rider-tone, #17231f);
		stroke-width: 3;
		stroke-linecap: round;
	}

	.c-wave-surf__leg {
		stroke: var(--wave-surf-rider-tone, #17231f);
		stroke-width: 2.5;
		stroke-linecap: round;
	}

	.c-wave-surf__head {
		fill: var(--wave-surf-rider-tone, #17231f);
	}

	.c-wave-surf--animated .c-wave-surf__wave {
		animation: wave-surf-break 4s ease-in-out infinite;
	}
	.c-wave-surf--animated .c-wave-surf__rider {
		animation: wave-surf-ride 4s ease-in-out infinite;
	}
	.c-wave-surf--animated .c-wave-surf__foam {
		animation: wave-surf-ride 4s ease-in-out infinite;
	}

	@keyframes wave-surf-break {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.035);
		}
	}

	@keyframes wave-surf-ride {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(-7px, -5px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.c-wave-surf__wave,
		.c-wave-surf__rider,
		.c-wave-surf__foam {
			animation: none !important;
		}
	}
</style>
