<script lang="ts">
	import FloatingIcon from '$stylist/animation/component/atom/floating-icon/index.svelte';
	import Heading from '$stylist/typography/component/atom/heading/index.svelte';
	import Text from '$stylist/typography/component/atom/text/index.svelte';
	import type { RecipeAtomicTierCard } from '$stylist/animation/interface/recipe/atomic-tier-card';

	let {
		icon,
		accent = 'primary',
		name,
		description,
		count,
		countLabel = 'components',
		delay,
		class: className = ''
	}: RecipeAtomicTierCard = $props();
</script>

<article class={`atomic-tier-card atomic-tier-card--${accent} ${className}`}>
	<FloatingIcon {icon} {accent} {delay} class="atomic-tier-card__icon" />
	<Heading level={3} text={name} fontSize="8" fontWeight="extrabold" class="atomic-tier-card__name" />
	{#if description}
		<Text text={description} block class="atomic-tier-card__description" />
	{/if}
	{#if count !== undefined}
		<Text
			text={String(count)}
			block
			fontSize="12"
			fontWeight="black"
			class="atomic-tier-card__count"
		/>
		<Text
			text={countLabel}
			block
			fontSize="3"
			fontWeight="semibold"
			class="atomic-tier-card__count-label"
		/>
	{/if}
</article>

<style>
	.atomic-tier-card {
		display: grid;
		gap: 0.5rem;
		align-content: start;
		border: 2px solid color-mix(in srgb, var(--atomic-tier-card-accent, var(--color-primary-500)) 38%, transparent);
		border-radius: var(--atomic-tier-card-radius, 1.5rem);
		background: var(--atomic-tier-card-surface, var(--color-background-primary));
		padding: var(--atomic-tier-card-padding, 2.5rem);
		box-shadow: var(--atomic-tier-card-shadow, 0 10px 15px -3px rgb(0 0 0 / 0.1));
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease,
			border-color 0.3s ease;
	}

	.atomic-tier-card:hover {
		transform: translateY(-0.5rem) scale(1.03);
		box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
		border-color: var(--atomic-tier-card-accent, var(--color-primary-500));
	}

	.atomic-tier-card--info {
		--atomic-tier-card-accent: var(--color-info-500);
	}
	.atomic-tier-card--primary {
		--atomic-tier-card-accent: var(--color-primary-500);
	}
	.atomic-tier-card--secondary {
		--atomic-tier-card-accent: var(--color-secondary-500);
	}
	.atomic-tier-card--success {
		--atomic-tier-card-accent: var(--color-success-400);
	}
	.atomic-tier-card--warning {
		--atomic-tier-card-accent: var(--color-warning-500);
	}

	:global(.atomic-tier-card__icon) {
		margin-bottom: 1.5rem;
	}

	:global(.atomic-tier-card__name) {
		margin: 0;
		--typography-color: var(--color-text-primary);
	}

	:global(.atomic-tier-card__description) {
		margin: 0 0 0.5rem;
		min-height: 3.75rem;
		--typography-color: var(--color-text-secondary);
	}

	:global(.atomic-tier-card__count) {
		margin: 0.75rem 0 0;
		--typography-color: color-mix(
			in srgb,
			var(--atomic-tier-card-accent, var(--color-primary-500)) 82%,
			var(--color-text-primary)
		);
	}

	:global(.atomic-tier-card__count-label) {
		margin: 0.25rem 0 0;
		--typography-color: var(--color-text-tertiary);
	}
</style>
