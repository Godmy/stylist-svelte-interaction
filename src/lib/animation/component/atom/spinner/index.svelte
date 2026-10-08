<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { createSpinnerState } from './state.svelte';
	import type { RecipeSpinner } from '$stylist/animation/interface/recipe/spinner';

	let props: RecipeSpinner & HTMLAttributes<HTMLSpanElement> = $props();
	const state = createSpinnerState(() => props);
</script>

<span class={state.classes} style={props.style} role="status" aria-label={state.label}>
	<span aria-hidden="true"></span>
</span>

<style>
	.information-spinner {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		color: var(--color-primary-600);
	}

	.information-spinner span {
		display: block;
		width: 100%;
		height: 100%;
		background:
			radial-gradient(farthest-side, currentColor 94%, transparent) top / 0.25rem 0.25rem no-repeat,
			conic-gradient(
				transparent 18%,
				color-mix(in srgb, currentColor 36%, transparent),
				currentColor
			);
		border-radius: 999px;
		-webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 0.1875rem), #000 0);
		mask: radial-gradient(farthest-side, transparent calc(100% - 0.1875rem), #000 0);
		animation: information-spinner-spin 0.75s linear infinite;
	}

	.information-spinner--sm {
		width: 1rem;
		height: 1rem;
	}

	.information-spinner--lg {
		width: 2rem;
		height: 2rem;
	}

	@keyframes information-spinner-spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
