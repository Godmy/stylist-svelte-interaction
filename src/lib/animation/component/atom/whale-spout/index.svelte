<script lang="ts">
	import type { RecipeWhaleSpout } from '$stylist/animation/interface/recipe/whale-spout';
	import { createMotionPreferenceState } from '$stylist/animation/function/state/motion-preference';

	let {
		tone = '#1f4959',
		spoutTone = '#d8f2f5',
		still = false,
		class: className = ''
	}: RecipeWhaleSpout = $props();

	const motionPreference = createMotionPreferenceState();
	const animated = $derived(!still && !motionPreference.prefersReducedMotion);
</script>

<svg
	class={`c-whale-spout ${animated ? 'c-whale-spout--animated' : ''} ${className}`}
	style:--whale-spout-tone={tone}
	style:--whale-spout-spout-tone={spoutTone}
	viewBox="0 0 220 140"
	aria-hidden="true"
	focusable="false"
>
	<path class="c-whale-spout__water" d="M0 128 Q55 120 110 128 T220 128 V140 H0 Z" />
	<path
		class="c-whale-spout__body"
		d="M18 116 Q38 76 98 74 Q132 74 146 90 Q118 86 88 90 Q48 96 18 116 Z"
	/>
	<circle class="c-whale-spout__eye" cx="32" cy="98" r="2.4" />
	<path
		class="c-whale-spout__tail"
		d="M142 94 L166 70 L186 58 L172 76 L190 88 L166 78 Z"
	/>

	<g class="c-whale-spout__plume">
		<ellipse class="c-whale-spout__droplet c-whale-spout__droplet--1" cx="94" cy="68" rx="4.5" ry="8" />
		<ellipse class="c-whale-spout__droplet c-whale-spout__droplet--2" cx="87" cy="69" rx="3.2" ry="6.5" />
		<ellipse class="c-whale-spout__droplet c-whale-spout__droplet--3" cx="102" cy="69" rx="3.2" ry="6.5" />
	</g>
</svg>

<style>
	.c-whale-spout {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
		color: var(--whale-spout-tone, #1f4959);
	}

	.c-whale-spout__body,
	.c-whale-spout__tail {
		fill: currentColor;
	}

	.c-whale-spout__water {
		fill: color-mix(in srgb, var(--whale-spout-tone, #1f4959) 25%, transparent);
	}

	.c-whale-spout__eye {
		fill: var(--whale-spout-spout-tone, #d8f2f5);
		opacity: 0.85;
	}

	.c-whale-spout__droplet {
		fill: var(--whale-spout-spout-tone, #d8f2f5);
		opacity: 0;
		transform-box: fill-box;
		transform-origin: bottom center;
	}

	.c-whale-spout--animated .c-whale-spout__droplet {
		animation: whale-spout-rise 3.4s ease-out infinite;
	}
	.c-whale-spout--animated .c-whale-spout__droplet--2 {
		animation-delay: 0.12s;
	}
	.c-whale-spout--animated .c-whale-spout__droplet--3 {
		animation-delay: 0.22s;
	}

	@keyframes whale-spout-rise {
		0%,
		68% {
			transform: translateY(0) scale(1);
			opacity: 0;
		}
		78% {
			opacity: 0.95;
		}
		100% {
			transform: translateY(-36px) scale(1.15);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.c-whale-spout__droplet {
			animation: none !important;
			opacity: 0;
		}
	}
</style>
