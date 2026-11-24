<script lang="ts">
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';

	import type { RecipeTiltCard } from '$stylist/animation/interface/recipe/tilt-card';
	import createTiltCardComponentState from '$stylist/animation/component/molecule/tilt-card/state.svelte';

	let {
		element = $bindable(null),
		children,
		label,
		disabled = false,
		maxAngle = 12,
		perspective = 1000,
		scale = 1.02,
		reverse = false,
		duration = 180,
		xAxis = true,
		yAxis = true,
		recovery = true,
		strength = 1,
		glare = false,
		glareOpacity = 0.3,
		depth = 0,
		onTilt,
		class: className,
		...rest
	}: RecipeTiltCard = $props();

	const state = createTiltCardComponentState(() => ({
		disabled: disabled,
		maxAngle: maxAngle,
		perspective: perspective,
		scale: scale,
		reverse: reverse,
		duration: duration,
		xAxis: xAxis,
		yAxis: yAxis,
		recovery: recovery,
		strength: strength,
		glareOpacity: glareOpacity,
		depth: depth,
		onTilt: onTilt
	}));
</script>

<HtmlDiv
	bind:element
	role={label ? 'group' : undefined}
	aria-label={label}
	{...rest}
	class={['c-tilt-card', className]}
	onpointermove={state.move}
	onpointerleave={() => state.reset()}
	onpointercancel={() => state.reset(true)}
>
	<HtmlDiv
		class="c-tilt-card__surface"
		style={`transform: perspective(${state.safePerspective}px) rotateX(${state.sample.rotateX}deg) rotateY(${state.sample.rotateY}deg) scale(${state.sample.active ? state.safeScale : 1}); transition-duration: ${state.safeDuration}ms`}
	>
		<HtmlDiv
			class="c-tilt-card__content"
			style={`transform: translateZ(${state.enabled ? state.safeDepth : 0}px)`}
		>
			{@render children?.()}
		</HtmlDiv>
		{#if glare}
			<HtmlSpan
				class="c-tilt-card__glare"
				aria-hidden="true"
				style={`transform: translateZ(${state.safeDepth + 1}px); opacity: ${state.sample.active ? state.opacity : 0}; background: radial-gradient(circle at ${state.sample.x * 100}% ${state.sample.y * 100}%, #ffffff, #ffffff00 65%)`}
			></HtmlSpan>
		{/if}
	</HtmlDiv>
</HtmlDiv>

<style>
	:global {
		.c-tilt-card {
			border-radius: inherit;
		}
		.c-tilt-card__surface {
			position: relative;
			border-radius: inherit;
			background: var(--tilt-background, transparent);
			transform-style: preserve-3d;
			transition-property: transform;
			transition-timing-function: ease-out;
		}
		.c-tilt-card__content {
			border-radius: inherit;
			transform-style: preserve-3d;
		}
		.c-tilt-card__glare {
			position: absolute;
			inset: 0;
			border-radius: inherit;
			pointer-events: none;
		}
		@media (prefers-reduced-motion: reduce), (hover: none) {
			.c-tilt-card__surface,
			.c-tilt-card__content {
				transform: none !important;
				transition: none;
			}
			.c-tilt-card__glare {
				display: none;
			}
		}
	}
</style>
