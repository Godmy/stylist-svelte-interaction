<script lang="ts">
	import type { RecipePalmSway } from '$stylist/animation/interface/recipe/palm-sway';
	import { createMotionPreferenceState } from '$stylist/animation/function/state/motion-preference';

	let {
		tone = '#2f6b4f',
		flip = false,
		still = false,
		class: className = ''
	}: RecipePalmSway = $props();

	const motionPreference = createMotionPreferenceState();
	const animated = $derived(!still && !motionPreference.prefersReducedMotion);

	// Angles are relative to "straight up" from the crown pivot, so the fan
	// spreads symmetrically left/right instead of bunching to one side.
	const FROND_ANGLES = [-98, -62, -22, 22, 62, 98];
</script>

<svg
	class={`c-palm-sway ${animated ? 'c-palm-sway--animated' : ''} ${className}`}
	style:--palm-sway-tone={tone}
	viewBox="0 0 200 220"
	aria-hidden="true"
	focusable="false"
	style:transform={flip ? 'scaleX(-1)' : undefined}
>
	<path
		class="c-palm-sway__trunk"
		d="M92 218 Q86 160 96 118 Q104 88 122 68 L132 70 Q118 90 112 120 Q106 162 112 218 Z"
	/>
	<path class="c-palm-sway__trunk-ring" d="M96 150 Q112 156 128 150" fill="none" />
	<path class="c-palm-sway__trunk-ring" d="M98 184 Q114 190 130 184" fill="none" />
	<g class="c-palm-sway__crown">
		{#each FROND_ANGLES as angle (angle)}
			<path
				class="c-palm-sway__frond"
				transform={`rotate(${angle} 127 68)`}
				d="M127 68 Q146 42 130 6 Q120 40 121 66 Z"
			/>
		{/each}
	</g>
</svg>

<style>
	.c-palm-sway {
		display: block;
		width: var(--palm-sway-size, 8rem);
		height: auto;
		overflow: visible;
		color: var(--palm-sway-tone, #2f6b4f);
	}

	.c-palm-sway__trunk,
	.c-palm-sway__frond {
		fill: currentColor;
	}

	.c-palm-sway__trunk {
		opacity: 0.92;
	}

	.c-palm-sway__trunk-ring {
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		opacity: 0.28;
	}

	.c-palm-sway__frond {
		opacity: 0.94;
	}

	.c-palm-sway--animated .c-palm-sway__crown {
		transform-origin: 63.5% 31%;
		animation: palm-sway 5s ease-in-out infinite;
	}

	@keyframes palm-sway {
		0%,
		100% {
			transform: rotate(-4deg);
		}
		50% {
			transform: rotate(5deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.c-palm-sway__crown {
			animation: none !important;
		}
	}
</style>
