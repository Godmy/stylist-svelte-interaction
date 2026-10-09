<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { createSkeletonState } from './state.svelte';
	import type { RecipeSkeleton } from '$stylist/animation/interface/recipe/skeleton';

	let props: RecipeSkeleton & HTMLAttributes<HTMLDivElement> = $props();
	const state = createSkeletonState(() => props);
</script>

<div class={state.classes} style={state.style} aria-hidden="true">
	{#if props.children}
		{@render props.children()}
	{:else}
		{#each Array(state.lines) as _}
			<span></span>
		{/each}
	{/if}
</div>

<style>
	.information-skeleton {
		--information-skeleton-width: 100%;
		--information-skeleton-height: 1rem;
		--information-skeleton-base: color-mix(
			in srgb,
			var(--color-text-primary) 10%,
			var(--color-background-secondary)
		);
		--information-skeleton-highlight: color-mix(
			in srgb,
			var(--color-text-primary) 20%,
			var(--color-background-primary)
		);

		display: grid;
		gap: 0.5rem;
		width: var(--information-skeleton-width);
		max-width: 100%;
	}

	.information-skeleton span {
		display: block;
		width: 100%;
		height: var(--information-skeleton-height);
		border-radius: var(--border-radius-base, 0.375rem);
		background: var(--information-skeleton-base);
	}

	.information-skeleton--circle {
		--information-skeleton-width: 2.5rem;
		--information-skeleton-height: 2.5rem;
	}

	.information-skeleton--circle span {
		border-radius: 999px;
	}

	.information-skeleton--text span {
		height: 0.875rem;
	}

	.information-skeleton--text span:last-child:not(:first-child) {
		width: 72%;
	}

	.information-skeleton--animated span {
		background:
			linear-gradient(90deg, transparent, var(--information-skeleton-highlight), transparent),
			var(--information-skeleton-base);
		background-size: 220% 100%;
		animation: information-skeleton-shimmer 1.35s ease-in-out infinite;
	}

	@keyframes information-skeleton-shimmer {
		to {
			background-position: -220% 0;
		}
	}
</style>
