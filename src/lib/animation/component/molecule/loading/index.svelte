<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import Spinner from '$stylist/animation/component/atom/spinner/index.svelte';
	import { createLoadingState } from './state.svelte';
	import type { RecipeLoading } from '$stylist/animation/interface/recipe/loading';

	let props: RecipeLoading & HTMLAttributes<HTMLDivElement> = $props();
	const state = createLoadingState(() => props);
</script>

{#if state.loading}
	<div class={state.classes} style={props.style} role="status" aria-live="polite">
		<span class="information-loading__indicator">
			<Spinner size={state.size} label={state.label} />
		</span>
		<span class="information-loading__content">
			<span class="information-loading__label">{state.label}</span>
			<span class="information-loading__track" aria-hidden="true">
				<span></span>
			</span>
		</span>
	</div>
{/if}

<style>
	.information-loading {
		display: inline-flex;
		align-items: center;
		gap: 0.875rem;
		width: min(100%, 19rem);
		padding: 0.875rem 1rem;
		color: var(--color-text-primary);
		background:
			linear-gradient(
				135deg,
				color-mix(in srgb, var(--color-primary-600) 10%, transparent),
				transparent 42%
			),
			var(--color-background-secondary, var(--color-background-primary));
		border: 1px solid color-mix(in srgb, var(--color-primary-600) 18%, var(--color-border-primary));
		border-radius: 0.5rem;
		box-shadow: 0 0.75rem 1.75rem color-mix(in srgb, var(--color-text-primary) 10%, transparent);
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	.information-loading__indicator {
		display: inline-flex;
		flex: 0 0 auto;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		color: var(--color-primary-600);
		background: color-mix(in srgb, var(--color-primary-600) 11%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-primary-600) 18%, transparent);
		border-radius: 999px;
	}

	.information-loading__content {
		display: grid;
		flex: 1 1 auto;
		min-width: 0;
		gap: 0.625rem;
	}

	.information-loading__label {
		overflow-wrap: anywhere;
		font-weight: 600;
	}

	.information-loading__track {
		position: relative;
		display: block;
		overflow: hidden;
		width: 100%;
		height: 0.375rem;
		background: color-mix(in srgb, var(--color-text-secondary) 13%, transparent);
		border-radius: 999px;
	}

	.information-loading__track span {
		position: absolute;
		inset-block: 0;
		left: -42%;
		width: 42%;
		background: linear-gradient(
			90deg,
			transparent,
			color-mix(in srgb, var(--color-primary-600) 82%, white),
			transparent
		);
		border-radius: inherit;
		animation: information-loading-track 1.25s ease-in-out infinite;
	}

	.information-loading--sm {
		width: min(100%, 15rem);
		padding: 0.625rem 0.75rem;
		gap: 0.625rem;
		font-size: 0.8125rem;
		line-height: 1.125rem;
	}

	.information-loading--sm .information-loading__indicator {
		width: 2rem;
		height: 2rem;
	}

	.information-loading--lg {
		width: min(100%, 23rem);
		padding: 1rem 1.125rem;
		gap: 1rem;
		font-size: 0.9375rem;
		line-height: 1.375rem;
	}

	.information-loading--lg .information-loading__indicator {
		width: 3.25rem;
		height: 3.25rem;
	}

	.information-loading--centered {
		justify-content: center;
		width: 100%;
		min-height: 7rem;
	}

	@keyframes information-loading-track {
		to {
			left: 100%;
		}
	}
</style>
