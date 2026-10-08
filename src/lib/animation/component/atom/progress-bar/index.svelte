<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { createProgressBarState } from './state.svelte';
	import type { RecipeProgressBar } from '$stylist/animation/interface/recipe/progress-bar';

	let props: RecipeProgressBar & HTMLAttributes<HTMLDivElement> = $props();
	const state = createProgressBarState(() => props);
</script>

<div class={state.classes} style={state.style}>
	<div class="information-progress-bar__header">
		<span>{state.label}</span>
		<span>{state.valueLabel}</span>
	</div>
	<div
		class="information-progress-bar__track"
		role="progressbar"
		aria-valuenow={state.value}
		aria-valuemin="0"
		aria-valuemax={state.max}
		aria-label={state.label}
	>
		<div class="information-progress-bar__fill" style={state.fillStyle}></div>
	</div>
</div>

<style>
	.information-progress-bar {
		display: grid;
		gap: 0.5rem;
		min-width: 0;
	}

	.information-progress-bar__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.information-progress-bar__track {
		height: 0.5rem;
		overflow: hidden;
		border-radius: 999px;
		background: var(--information-progress-track-color, var(--color-neutral-200));
	}

	.information-progress-bar__fill {
		height: 100%;
		border-radius: inherit;
		background: var(--information-progress-color, var(--color-primary-600));
		transition: width 180ms ease-out;
	}
</style>
