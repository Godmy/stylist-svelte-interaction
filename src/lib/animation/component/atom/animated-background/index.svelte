<script lang="ts">
	import type { RecipeAnimatedBackground } from '$stylist/animation/interface/recipe/animated-background';
	import createAnimatedBackgroundState from './state.svelte';
	import Background from '$stylist/layout/component/atom/background/index.svelte';

	let props: RecipeAnimatedBackground = $props();
	const state = createAnimatedBackgroundState(() => props);
</script>

<div class={state.containerClasses} style={state.inlineStyle}>
	<Background class="ambient-bg__wash" aria-hidden="true" />

	<div class="ambient-bg__shape s1" aria-hidden="true"></div>
	<div class="ambient-bg__shape s2" aria-hidden="true"></div>
	<div class="ambient-bg__shape s3" aria-hidden="true"></div>

	<div class="ambient-bg__orb o1" aria-hidden="true"></div>
	<div class="ambient-bg__orb o2" aria-hidden="true"></div>
	<div class="ambient-bg__orb o3" aria-hidden="true"></div>
	<div class="ambient-bg__orb o4" aria-hidden="true"></div>
	<div class="ambient-bg__orb o5" aria-hidden="true"></div>

	<div class="ambient-bg__particles" aria-hidden="true">
		{#each state.particleIndices as particleIndex}
			<span class={`ambient-bg__particle p${particleIndex}`}></span>
		{/each}
	</div>

	<svg class="ambient-bg__geo" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
		<defs>
			<radialGradient id="animated-background-gradient-1" cx="30%" cy="20%" r="60%">
				<stop offset="0%" stop-color="var(--color-warning-500)" stop-opacity="0.12" />
				<stop offset="100%" stop-color="var(--color-danger-500)" stop-opacity="0" />
			</radialGradient>
			<radialGradient id="animated-background-gradient-2" cx="70%" cy="70%" r="65%">
				<stop offset="0%" stop-color="var(--color-error-500)" stop-opacity="0.10" />
				<stop offset="100%" stop-color="var(--color-error-500)" stop-opacity="0" />
			</radialGradient>
		</defs>
		<circle cx="20" cy="15" r="18" fill="url(#animated-background-gradient-1)" />
		<circle cx="78" cy="72" r="22" fill="url(#animated-background-gradient-2)" />
	</svg>

	<div class="animated-background__content">
		{#if state.children}
			{@render state.children()}
		{/if}
	</div>
</div>

<style>
	.c-animated-background {
		position: relative;
		overflow: hidden;
		isolation: isolate;
	}

	.ambient-bg {
		background:
			radial-gradient(
				circle at top left,
				color-mix(in srgb, var(--color-warning-500) 22%, transparent),
				transparent 48%
			),
			radial-gradient(
				circle at bottom right,
				color-mix(in srgb, var(--color-error-500) 18%, transparent),
				transparent 52%
			),
			linear-gradient(
				135deg,
				color-mix(in srgb, var(--color-background-primary) 92%, white 8%),
				color-mix(in srgb, var(--color-background-secondary) 88%, transparent)
			);
	}

	.ambient-bg__wash,
	.ambient-bg__shape,
	.ambient-bg__orb,
	.ambient-bg__particles,
	.ambient-bg__geo {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.ambient-bg__wash {
		opacity: 0.9;
		filter: blur(24px);
	}

	.ambient-bg__shape {
		border-radius: 999px;
		filter: blur(56px);
		opacity: var(--animated-background-shape-opacity, 0.45);
		animation: ambient-float var(--animated-background-shape-duration, 16s) ease-in-out infinite
			alternate;
	}

	.ambient-bg__shape.s1 {
		top: -8%;
		left: -6%;
		width: 18rem;
		height: 18rem;
		background: color-mix(in srgb, var(--color-warning-500) 32%, transparent);
	}

	.ambient-bg__shape.s2 {
		top: 24%;
		right: -10%;
		width: 22rem;
		height: 22rem;
		background: color-mix(in srgb, var(--color-danger-500) 20%, transparent);
		animation-duration: calc(var(--animated-background-shape-duration, 16s) * 1.125);
	}

	.ambient-bg__shape.s3 {
		bottom: -14%;
		left: 28%;
		width: 20rem;
		height: 20rem;
		background: color-mix(in srgb, var(--color-error-500) 24%, transparent);
		animation-duration: calc(var(--animated-background-shape-duration, 16s) * 1.25);
	}

	.ambient-bg__orb {
		border-radius: 999px;
		filter: blur(2px);
		opacity: var(--animated-background-orb-opacity, 0.5);
		animation: ambient-drift var(--animated-background-orb-duration, 14s) ease-in-out infinite;
	}

	.ambient-bg__orb.o1,
	.ambient-bg__orb.o2,
	.ambient-bg__orb.o3,
	.ambient-bg__orb.o4,
	.ambient-bg__orb.o5 {
		position: absolute;
	}

	.ambient-bg__orb.o1 {
		top: 14%;
		left: 12%;
		width: 1rem;
		height: 1rem;
		background: color-mix(in srgb, white 70%, var(--color-warning-500));
	}

	.ambient-bg__orb.o2 {
		top: 20%;
		right: 18%;
		width: 1.35rem;
		height: 1.35rem;
		background: color-mix(in srgb, white 62%, var(--color-danger-500));
		animation-delay: -3s;
	}

	.ambient-bg__orb.o3 {
		bottom: 22%;
		left: 18%;
		width: 0.9rem;
		height: 0.9rem;
		background: color-mix(in srgb, white 68%, var(--color-error-500));
		animation-delay: -6s;
	}

	.ambient-bg__orb.o4 {
		bottom: 14%;
		right: 28%;
		width: 1.1rem;
		height: 1.1rem;
		background: color-mix(in srgb, white 64%, var(--color-warning-500));
		animation-delay: -9s;
	}

	.ambient-bg__orb.o5 {
		top: 46%;
		left: 54%;
		width: 0.8rem;
		height: 0.8rem;
		background: color-mix(in srgb, white 72%, var(--color-danger-500));
		animation-delay: -12s;
	}

	.ambient-bg__particles {
		overflow: hidden;
	}

	.ambient-bg__particle {
		position: absolute;
		display: block;
		width: 0.3rem;
		height: 0.3rem;
		border-radius: 999px;
		background: color-mix(in srgb, white 78%, var(--color-warning-500));
		opacity: var(--animated-background-particle-opacity, 0.32);
		animation: ambient-particle var(--animated-background-particle-duration, 22s) linear infinite;
	}

	.ambient-bg__particle.p1 {
		top: 10%;
		left: 8%;
		animation-delay: -2s;
	}
	.ambient-bg__particle.p2 {
		top: 16%;
		left: 26%;
		animation-delay: -5s;
	}
	.ambient-bg__particle.p3 {
		top: 8%;
		left: 48%;
		animation-delay: -11s;
	}
	.ambient-bg__particle.p4 {
		top: 24%;
		left: 72%;
		animation-delay: -7s;
	}
	.ambient-bg__particle.p5 {
		top: 38%;
		left: 12%;
		animation-delay: -13s;
	}
	.ambient-bg__particle.p6 {
		top: 44%;
		left: 38%;
		animation-delay: -17s;
	}
	.ambient-bg__particle.p7 {
		top: 54%;
		left: 84%;
		animation-delay: -3s;
	}
	.ambient-bg__particle.p8 {
		top: 62%;
		left: 58%;
		animation-delay: -19s;
	}
	.ambient-bg__particle.p9 {
		top: 72%;
		left: 18%;
		animation-delay: -23s;
	}
	.ambient-bg__particle.p10 {
		top: 78%;
		left: 46%;
		animation-delay: -29s;
	}
	.ambient-bg__particle.p11 {
		top: 86%;
		left: 70%;
		animation-delay: -31s;
	}
	.ambient-bg__particle.p12 {
		top: 30%;
		left: 92%;
		animation-delay: -37s;
	}

	.ambient-bg__geo {
		opacity: var(--animated-background-geo-opacity, 0.7);
	}

	.animated-background__content {
		position: relative;
		z-index: 1;
	}

	@keyframes ambient-float {
		from {
			transform: translate3d(0, 0, 0) scale(1);
		}
		to {
			transform: translate3d(1.5rem, -1rem, 0) scale(1.08);
		}
	}

	@keyframes ambient-drift {
		0%,
		100% {
			transform: translate3d(0, 0, 0);
			opacity: 0.35;
		}
		50% {
			transform: translate3d(0.5rem, -0.75rem, 0);
			opacity: 0.65;
		}
	}

	@keyframes ambient-particle {
		from {
			transform: translate3d(0, 0, 0);
		}
		50% {
			transform: translate3d(0.5rem, -1rem, 0);
		}
		to {
			transform: translate3d(-0.4rem, -2rem, 0);
		}
	}
</style>
