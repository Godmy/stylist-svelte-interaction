<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import type { RecipeFloatingIcon } from '$stylist/animation/interface/recipe/floating-icon';

	let {
		icon,
		accent = 'primary',
		delay,
		still = false,
		class: className = ''
	}: RecipeFloatingIcon = $props();
</script>

<span
	class={`floating-icon floating-icon--${accent} ${still ? 'floating-icon--still' : ''} ${className}`}
	style={delay ? `animation-delay: ${delay};` : undefined}
>
	<BaseIcon name={icon} size="xl" class="floating-icon__glyph" />
</span>

<style>
	.floating-icon {
		display: inline-grid;
		place-items: center;
		width: var(--floating-icon-size, 6rem);
		height: var(--floating-icon-size, 6rem);
		border-radius: var(--floating-icon-radius, 1rem);
		background: linear-gradient(
			to bottom right,
			var(--floating-icon-accent, var(--color-primary-500)),
			color-mix(in srgb, var(--floating-icon-accent, var(--color-primary-500)) 55%, var(--color-primary-400))
		);
		box-shadow: var(--floating-icon-shadow, 0 10px 15px -3px rgb(0 0 0 / 0.1));
		animation: floating-icon-float var(--floating-icon-duration, var(--duration-s6, 6s))
			var(--animation-ease-in-out, ease-in-out) infinite;
	}

	.floating-icon--still {
		animation: none;
	}

	.floating-icon--info {
		--floating-icon-accent: var(--color-info-500);
	}
	.floating-icon--primary {
		--floating-icon-accent: var(--color-primary-500);
	}
	.floating-icon--secondary {
		--floating-icon-accent: var(--color-secondary-500);
	}
	.floating-icon--success {
		--floating-icon-accent: var(--color-success-400);
	}
	.floating-icon--warning {
		--floating-icon-accent: var(--color-warning-500);
	}

	:global(.floating-icon__glyph) {
		width: var(--floating-icon-glyph-size, 3rem);
		height: var(--floating-icon-glyph-size, 3rem);
		color: var(--floating-icon-glyph-color, #fff);
	}

	@keyframes floating-icon-float {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-1.25rem) rotate(5deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.floating-icon {
			animation: none;
		}
	}
</style>
