<script lang="ts">
	import HtmlH2 from '$stylist/html/component/atom/h2/index.svelte';
	import HtmlOutput from '$stylist/html/component/atom/output/index.svelte';
	import HtmlP from '$stylist/html/component/atom/p/index.svelte';
	import HtmlSpan from '$stylist/html/component/atom/span/index.svelte';
	import HtmlArticle from '$stylist/html/component/organism/article/index.svelte';
	import HtmlDiv from '$stylist/html/component/organism/div/index.svelte';
	import HtmlSection from '$stylist/html/component/organism/section/index.svelte';
	import TiltCard from '$stylist/animation/component/molecule/tilt-card/index.svelte';
	import type { RecipeTiltShowcase } from '$stylist/animation/interface/recipe/tilt-showcase';
	import type { TiltSample } from '$stylist/animation/type/struct/tilt-sample';

	let {
		element = $bindable(null),
		title = 'Карточка с глубиной',
		eyebrow = 'ATELIER / DIGITAL OBJECTS',
		heading = 'Другой угол зрения.',
		text = 'Объёмная типографика и свет, следующий за курсором.',
		disabled,
		maxAngle = 12,
		perspective = 800,
		scale = 1.03,
		reverse,
		duration,
		xAxis,
		yAxis,
		recovery,
		strength,
		glare = true,
		glareOpacity,
		depth = 25,
		onTilt,
		class: className,
		...rest
	}: RecipeTiltShowcase = $props();

	let sample = $state<TiltSample>({ x: 0.5, y: 0.5, rotateX: 0, rotateY: 0, active: false });
</script>

<HtmlSection bind:element {...rest} class={['c-tilt-showcase', className]} aria-label={title}>
	<TiltCard
		class="c-tilt-showcase__card"
		label={title}
		{disabled}
		{maxAngle}
		{perspective}
		{scale}
		{reverse}
		{duration}
		{xAxis}
		{yAxis}
		{recovery}
		{strength}
		{glare}
		{glareOpacity}
		{depth}
		onTilt={(value) => {
			sample = value;
			onTilt?.(value);
		}}
	>
		<HtmlArticle class="c-tilt-showcase__art">
			<HtmlSpan class="c-tilt-showcase__eyebrow">{eyebrow}</HtmlSpan>
			<HtmlDiv class="c-tilt-showcase__orbit" aria-hidden="true"></HtmlDiv>
			<HtmlH2 class="c-tilt-showcase__heading">{heading}</HtmlH2>
			<HtmlP class="c-tilt-showcase__text">{text}</HtmlP>
		</HtmlArticle>
	</TiltCard>
	<HtmlOutput class="c-tilt-showcase__readout" aria-label="Положение наклона">
		X {sample.rotateX.toFixed(1)}° · Y {sample.rotateY.toFixed(1)}°
	</HtmlOutput>
</HtmlSection>

<style>
	:global {
		.c-tilt-showcase {
			--tilt-background: linear-gradient(
				145deg,
				var(--color-primary-900, #2a2450),
				var(--color-primary-500, #66559c) 60%,
				var(--color-warning-300, #c6a690)
			);
			display: grid;
			gap: var(--layout-spacing-1rem, 1rem);
			min-width: 0;
			padding: calc(var(--layout-spacing-1rem, 1rem) * 3) calc(var(--layout-spacing-1rem, 1rem) * 2);
			border-radius: var(--layout-border-radius-xl, 1rem);
			background: var(--color-background-secondary);
		}
		.c-tilt-showcase__card {
			border-radius: var(--layout-border-radius-xxl, 1.2rem);
		}
		.c-tilt-showcase__art {
			position: relative;
			isolation: isolate;
			min-height: 22.5rem;
			padding: calc(var(--layout-spacing-1rem, 1rem) * 2);
			overflow: hidden;
			border-radius: inherit;
			box-shadow: var(--elevation-level3, 0 25px 55px #30264750);
			color: var(--color-text-inverse, #fff);
		}
		.c-tilt-showcase__eyebrow {
			font-size: var(--typography-font-size-2, 0.65rem);
			letter-spacing: 0.2em;
		}
		.c-tilt-showcase__orbit {
			position: absolute;
			top: 2.8rem;
			right: -4.4rem;
			width: 15rem;
			height: 15rem;
			border: 1.5rem solid color-mix(in srgb, currentColor 30%, transparent);
			border-radius: var(--layout-border-radius-full, 9999px);
			transform: rotate(-25deg) scaleY(0.6);
		}
		.c-tilt-showcase__heading {
			position: relative;
			max-width: 12ch;
			margin: calc(var(--layout-spacing-1rem, 1rem) * 3) 0 0;
			font-size: clamp(2rem, 4vw, 3.5rem);
			line-height: 1.05;
			letter-spacing: -0.05em;
			color: inherit;
		}
		.c-tilt-showcase__text {
			position: relative;
			max-width: 22ch;
			line-height: 1.7;
			opacity: var(--opacity-80, 0.85);
		}
		.c-tilt-showcase__readout {
			justify-self: center;
			font-variant-numeric: tabular-nums;
			color: var(--color-text-secondary);
		}
		@media (max-width: 760px) {
			.c-tilt-showcase {
				padding: calc(var(--layout-spacing-1rem, 1rem) * 2) var(--layout-spacing-1rem, 1rem);
			}
			.c-tilt-showcase__art {
				min-height: 20rem;
				padding: calc(var(--layout-spacing-1rem, 1rem) * 1.5);
			}
		}
	}
</style>
