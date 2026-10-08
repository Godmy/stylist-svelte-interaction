<script lang="ts">
	import type { RecipeTurtleLogoMark } from '$stylist/animation/interface/recipe/turtle-logo-mark';

	let {
		tone = '#0e7c7b',
		accent = '#2ec4b6',
		class: className = '',
		shellOpacity = 1,
		spiralOpacity = 1,
		headOpacity = 1,
		frontLeftFlipperOpacity = 1,
		frontRightFlipperOpacity = 1,
		rearFlippersOpacity = 1
	}: RecipeTurtleLogoMark = $props();
</script>

<!--
	viewBox is intentionally wide/flat (300×140, content bbox ≈2.11:1) to match
	hero-photo.jpg's natural turtle crop aspect ratio used by
	turtle-photo-to-mark (see CHIP_ASPECT_RATIO there) — keeping both layers'
	boxes the same shape is what keeps the photo turtle and this mark the
	same apparent size during the crossfade, instead of one box padding out
	taller/shorter than the other.
-->
<svg
	class={`c-turtle-logo-mark ${className}`}
	style:--turtle-logo-mark-tone={tone}
	style:--turtle-logo-mark-accent={accent}
	viewBox="0 0 300 140"
	aria-hidden="true"
	focusable="false"
>
	<defs>
		<linearGradient id="turtle-logo-mark-shell" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%" stop-color="var(--turtle-logo-mark-tone)" />
			<stop offset="100%" stop-color="var(--turtle-logo-mark-accent)" />
		</linearGradient>
	</defs>

	<path
		class="c-turtle-logo-mark__flipper"
		style:opacity={frontLeftFlipperOpacity}
		d="M110 35 Q60 5 15 12 Q55 35 95 55 Q108 50 110 35 Z"
	/>
	<path
		class="c-turtle-logo-mark__flipper"
		style:opacity={frontRightFlipperOpacity}
		d="M205 95 Q250 130 296 128 Q262 100 220 82 Q206 84 205 95 Z"
	/>
	<g style:opacity={rearFlippersOpacity}>
		<path class="c-turtle-logo-mark__foot" d="M85 108 Q78 132 55 136 Q60 112 85 108 Z" />
		<path class="c-turtle-logo-mark__foot" d="M120 112 Q126 136 148 138 Q140 114 120 112 Z" />
	</g>

	<g style:opacity={shellOpacity}>
		<path class="c-turtle-logo-mark__body-base" d="M90 100 Q145 128 205 100 Q150 118 90 100 Z" />
		<ellipse class="c-turtle-logo-mark__shell" cx="145" cy="72" rx="68" ry="50" />
	</g>
	<g
		class="c-turtle-logo-mark__spiral"
		style:opacity={spiralOpacity}
		transform="translate(145 72)"
	>
		<path
			d="M40 0 L37.9 10.5 L33.2 19.9 L26.3 27.5 L17.7 33 L8.2 35.9 L-1.6 36.1 L-11 33.8 L-19.2 29.1 L-25.8 22.5 L-30.2 14.6 L-32.4 5.9 L-32.2 -2.9 L-29.6 -11.1 L-25.1 -18.2 L-18.9 -23.7 L-11.7 -27.3 L-3.9 -28.8 L3.8 -28.2 L10.9 -25.5 L16.9 -21.2 L21.4 -15.6 L24.2 -9.1 L25.1 -2.3 L24.2 4.4 L21.6 10.4 L17.5 15.3 L12.5 18.9 L6.8 20.9 L1 21.3 L-4.6 20.2 L-9.5 17.7 L-13.4 14 L-16.1 9.6 L-17.5 4.8 L-17.5 0 L-16.2 -4.5 L-13.9 -8.3 L-10.8 -11.3 L-7.1 -13.1 L-3.2 -13.9 L0.6 -13.6 L4 -12.4 L6.8 -10.3 L8.8 -7.7 L10 -4.8 L10.3 -1.9 L9.7 0.9 L8.6 3.2 L6.9 5 L4.9 6.1 L2.8 6.6 L0.9 6.5 L-0.8 5.9 L-2.1 4.9 L-2.9 3.6 L-3.2 2.4"
			fill="none"
		/>
	</g>

	<g style:opacity={headOpacity}>
		<path class="c-turtle-logo-mark__neck" d="M205 55 Q222 40 214 66 Q208 62 205 55 Z" />
		<ellipse class="c-turtle-logo-mark__head" cx="246" cy="42" rx="32" ry="24" />
		<circle class="c-turtle-logo-mark__eye" cx="258" cy="34" r="4" />
	</g>
</svg>

<style>
	.c-turtle-logo-mark {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
	}

	.c-turtle-logo-mark__shell,
	.c-turtle-logo-mark__head {
		fill: url(#turtle-logo-mark-shell);
	}

	.c-turtle-logo-mark__body-base {
		fill: #a7d76b;
		opacity: 0.5;
	}

	.c-turtle-logo-mark__neck {
		fill: #cfe8a0;
	}

	.c-turtle-logo-mark__spiral path {
		stroke: color-mix(in srgb, white 82%, transparent);
		stroke-width: 4.5;
		stroke-linecap: round;
	}

	.c-turtle-logo-mark__flipper,
	.c-turtle-logo-mark__foot {
		fill: var(--turtle-logo-mark-accent);
	}

	.c-turtle-logo-mark__eye {
		fill: #ffffff;
	}
</style>
