<script lang="ts">
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import { pointerPosition } from '$stylist/animation/function/transform/pointer-position';
	import { tiltSample } from '$stylist/animation/function/transform/tilt-sample';
	import type { RecipeTiltCard } from '$stylist/animation/interface/recipe/tilt-card';

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

	let position = $state({ x: 0.5, y: 0.5 });
	let active = $state(false);
	let motionAllowed = $state(false);

	const enabled = $derived(!disabled && motionAllowed);
	const sample = $derived(
		tiltSample(position.x, position.y, maxAngle, reverse, strength, xAxis, yAxis, active && enabled)
	);
	const safePerspective = $derived(Number.isFinite(perspective) ? Math.max(1, perspective) : 1000);
	const safeScale = $derived(Number.isFinite(scale) ? Math.min(3, Math.max(0.1, scale)) : 1.02);
	const safeDuration = $derived(Number.isFinite(duration) ? Math.max(0, duration) : 180);
	const safeDepth = $derived(Number.isFinite(depth) ? Math.min(100, Math.max(0, depth)) : 0);
	const opacity = $derived(
		Number.isFinite(glareOpacity) ? Math.min(1, Math.max(0, glareOpacity)) : 0.3
	);

	$effect(() => {
		const media = window.matchMedia?.('(prefers-reduced-motion: reduce), (hover: none)');
		if (!media) {
			motionAllowed = true;
			return;
		}
		const update = () => {
			motionAllowed = !media.matches;
			if (media.matches) active = false;
		};
		update();
		media.addEventListener('change', update);
		return () => media.removeEventListener('change', update);
	});

	$effect(() => {
		if (!disabled) return;
		active = false;
		position = { x: 0.5, y: 0.5 };
	});

	function emit(x: number, y: number, engaged: boolean) {
		onTilt?.(tiltSample(x, y, maxAngle, reverse, strength, xAxis, yAxis, engaged));
	}

	function move(event: PointerEvent) {
		if (!enabled || event.pointerType === 'touch') return;
		position = pointerPosition(
			event.clientX,
			event.clientY,
			(event.currentTarget as HTMLElement).getBoundingClientRect()
		);
		active = true;
		emit(position.x, position.y, true);
	}

	function reset(force = false) {
		if (!force && !recovery) return;
		active = false;
		position = { x: 0.5, y: 0.5 };
		emit(0.5, 0.5, false);
	}
</script>

<HtmlDiv
	bind:element
	role={label ? 'group' : undefined}
	aria-label={label}
	{...rest}
	class={['c-tilt-card', className]}
	onpointermove={move}
	onpointerleave={() => reset()}
	onpointercancel={() => reset(true)}
>
	<HtmlDiv
		class="c-tilt-card__surface"
		style={`transform: perspective(${safePerspective}px) rotateX(${sample.rotateX}deg) rotateY(${sample.rotateY}deg) scale(${sample.active ? safeScale : 1}); transition-duration: ${safeDuration}ms`}
	>
		<HtmlDiv
			class="c-tilt-card__content"
			style={`transform: translateZ(${enabled ? safeDepth : 0}px)`}
		>
			{@render children?.()}
		</HtmlDiv>
		{#if glare}
			<HtmlSpan
				class="c-tilt-card__glare"
				aria-hidden="true"
				style={`transform: translateZ(${safeDepth + 1}px); opacity: ${sample.active ? opacity : 0}; background: radial-gradient(circle at ${sample.x * 100}% ${sample.y * 100}%, #ffffff, #ffffff00 65%)`}
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
