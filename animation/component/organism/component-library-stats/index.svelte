<script lang="ts">
	import type { RecipeComponentLibraryStats } from '$stylist/animation/interface/recipe/component-library-stats';
	import { createComponentLibraryStatsState } from './state.svelte';

	let { ...props }: RecipeComponentLibraryStats = $props();
	const state = createComponentLibraryStatsState(() => props);
</script>

<div id={state.sectionId} class={state.containerClass} {...state.restProps}>
	<div class={state.statsGridClass}>
		<div class={state.getStatCardClass('orange')}>
			<div class={state.getStatValueClass('orange')}>
				{state.animatedStats.totalComponents}
			</div>
			<div class={state.getStatLabelClass}>Components</div>
		</div>

		<div class={state.getStatCardClass('blue')}>
			<div class={state.getStatValueClass('blue')}>
				{state.animatedStats.atoms}
			</div>
			<div class={state.getStatLabelClass}>Atoms</div>
		</div>

		<div class={state.getStatCardClass('purple')}>
			<div class={state.getStatValueClass('purple')}>
				{state.animatedStats.molecules}
			</div>
			<div class={state.getStatLabelClass}>Molecules</div>
		</div>

		<div class={state.getStatCardClass('green')}>
			<div class={state.getStatValueClass('green')}>
				{state.animatedStats.organisms}
			</div>
			<div class={state.getStatLabelClass}>Organisms</div>
		</div>
	</div>
</div>

<style>
	.c-component-library-stats {
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: var(--color-background-primary);
		padding: 1.5rem;
	}

	.c-component-library-stats__grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.c-component-library-stats__card {
		border-radius: 0.5rem;
		background: var(--color-background-secondary);
		padding: 1rem;
		text-align: center;
	}

	.c-component-library-stats__value {
		font-size: 1.875rem;
		font-weight: 700;
		color: var(--color-primary-600);
	}

	.c-component-library-stats__label {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	@media (min-width: 768px) {
		.c-component-library-stats__grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
</style>
