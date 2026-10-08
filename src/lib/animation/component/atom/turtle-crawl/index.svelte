<script lang="ts">
	import type { RecipeTurtleCrawl } from '$stylist/animation/interface/recipe/turtle-crawl';
	import { createMotionPreferenceState } from '$stylist/animation/function/state/motion-preference';

	let { tone = '#3f6f46', still = false, class: className = '' }: RecipeTurtleCrawl = $props();

	const motionPreference = createMotionPreferenceState();
	const animated = $derived(!still && !motionPreference.prefersReducedMotion);
</script>

<svg
	class={`c-turtle-crawl ${animated ? 'c-turtle-crawl--animated' : ''} ${className}`}
	style:--turtle-crawl-tone={tone}
	viewBox="0 0 220 120"
	aria-hidden="true"
	focusable="false"
>
	<path
		class="c-turtle-crawl__shore"
		d="M0 108 Q55 100 110 108 T220 108 V120 H0 Z"
		fill="var(--turtle-crawl-shore, #d9c9a3)"
	/>
	<g class="c-turtle-crawl__body">
		<path
			class="c-turtle-crawl__leg c-turtle-crawl__leg--front"
			d="M52 96 Q40 100 34 92"
			fill="none"
		/>
		<path
			class="c-turtle-crawl__leg c-turtle-crawl__leg--back"
			d="M84 98 Q96 102 102 94"
			fill="none"
		/>
		<path class="c-turtle-crawl__tail" d="M96 84 Q108 84 110 78 Q104 88 96 84 Z" />
		<ellipse class="c-turtle-crawl__shell" cx="66" cy="80" rx="30" ry="20" />
		<circle class="c-turtle-crawl__head" cx="32" cy="82" r="8" />
	</g>
</svg>

<style>
	.c-turtle-crawl {
		display: block;
		width: 100%;
		height: auto;
		overflow: hidden;
		color: var(--turtle-crawl-tone, #3f6f46);
	}

	.c-turtle-crawl__shore {
		opacity: 0.6;
	}

	.c-turtle-crawl__shell,
	.c-turtle-crawl__head,
	.c-turtle-crawl__tail {
		fill: currentColor;
	}

	.c-turtle-crawl__leg {
		stroke: currentColor;
		stroke-width: 4;
		stroke-linecap: round;
	}

	.c-turtle-crawl--animated .c-turtle-crawl__body {
		animation: turtle-crawl-forward 7s linear infinite;
	}

	.c-turtle-crawl--animated .c-turtle-crawl__leg--front {
		animation: turtle-crawl-paddle 0.7s ease-in-out infinite;
		transform-origin: 43% 80%;
	}
	.c-turtle-crawl--animated .c-turtle-crawl__leg--back {
		animation: turtle-crawl-paddle 0.7s ease-in-out infinite reverse;
		transform-origin: 93% 82%;
	}

	@keyframes turtle-crawl-forward {
		0% {
			transform: translateX(0) translateY(0);
		}
		25% {
			transform: translateX(35px) translateY(-2px);
		}
		50% {
			transform: translateX(70px) translateY(0);
		}
		75% {
			transform: translateX(105px) translateY(-2px);
		}
		100% {
			transform: translateX(140px) translateY(0);
		}
	}

	@keyframes turtle-crawl-paddle {
		0%,
		100% {
			transform: rotate(-6deg);
		}
		50% {
			transform: rotate(6deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.c-turtle-crawl__body,
		.c-turtle-crawl__leg--front,
		.c-turtle-crawl__leg--back {
			animation: none !important;
		}
	}
</style>
