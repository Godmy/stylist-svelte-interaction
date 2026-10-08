<script lang="ts">
	import BaseIcon from '$stylist/svg/component/atom/icon/index.svelte';
	import Heading from '$stylist/typography/component/atom/heading/index.svelte';
	import Text from '$stylist/typography/component/atom/text/index.svelte';
	import AtomicTierCard from '$stylist/animation/component/molecule/atomic-tier-card/index.svelte';
	import { PresetAtomicPrinciplesShowcase } from '$stylist/animation/const/preset/atomic-principles-showcase';
	import type { RecipeAtomicPrinciplesShowcase } from '$stylist/animation/interface/recipe/atomic-principles-showcase';
	import { createAtomicPrinciplesShowcaseState } from './state.svelte';

	let { ...props }: RecipeAtomicPrinciplesShowcase = $props();
	const state = createAtomicPrinciplesShowcaseState(() => props);
</script>

<section class={state.className} {...state.restProps}>
	<div class="atomic-principles-showcase__inner">
		<div class="atomic-principles-showcase__intro">
			<span class="atomic-principles-showcase__badge">
				<BaseIcon
					name={PresetAtomicPrinciplesShowcase.BadgeIcon}
					size="sm"
					class="atomic-principles-showcase__badge-icon"
				/>
				<Text text={state.badgeText} fontSize="3" fontWeight="semibold" />
			</span>
			<Heading level={2} text={state.title} class="atomic-principles-showcase__title" />
			<Text text={state.description} block class="atomic-principles-showcase__description" />
		</div>

		<div class="atomic-principles-showcase__grid">
			{#each state.tiers as tier (tier.key)}
				<AtomicTierCard
					icon={tier.icon}
					accent={tier.accent}
					name={tier.name}
					description={tier.description}
					count={tier.count}
					delay={tier.delay}
				/>
			{/each}
		</div>
	</div>
</section>

<style>
	.atomic-principles-showcase__inner {
		max-width: 80rem;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.atomic-principles-showcase__intro {
		text-align: center;
		display: grid;
		justify-items: center;
		gap: 1.25rem;
	}

	.atomic-principles-showcase__badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		border-radius: 999px;
		background: var(--color-primary-100);
		padding: 0.5rem 1rem;
		color: var(--color-primary-700);
	}

	:global(.atomic-principles-showcase__badge-icon) {
		width: 1rem;
		height: 1rem;
	}

	:global(.atomic-principles-showcase__title) {
		margin: 0;
		--typography-font-size: 2.25rem;
		--typography-font-weight: 700;
		--typography-color: var(--color-text-primary);
	}

	:global(.atomic-principles-showcase__description) {
		margin: 0;
		max-width: 42rem;
		--typography-font-size: 1.125rem;
		--typography-line-height: 1.8;
		--typography-color: var(--color-text-secondary);
	}

	.atomic-principles-showcase__grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-top: 4rem;
	}

	@media (min-width: 640px) {
		.atomic-principles-showcase__inner {
			padding: 0 1.5rem;
		}
	}

	@media (min-width: 768px) {
		.atomic-principles-showcase__grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1024px) {
		.atomic-principles-showcase__inner {
			padding: 0 2rem;
		}
		.atomic-principles-showcase__grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
