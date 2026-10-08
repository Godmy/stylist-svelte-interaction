<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { RecipeZoomControls } from '$stylist/control/interface/recipe/zoom-controls';
	import { createZoomControlsState } from './state.svelte';

	let props: RecipeZoomControls & HTMLAttributes<HTMLDivElement> = $props();
	const state = createZoomControlsState(() => props);
</script>

<div class="zoom-controls" role="group" aria-label="Zoom controls">
	<button class="zoom-button" onclick={state.handleZoomOut} aria-label="Zoom out" title="Zoom out">
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				d="M14 13L10 9M11 6.5C11 9.53757 8.53757 12 5.5 12C2.46243 12 0 9.53757 0 6.5C0 3.46243 2.46243 1 5.5 1C8.53757 1 11 3.46243 11 6.5Z"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
			<path d="M3 6.5H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
		</svg>
	</button>

	<span class="zoom-value">{Math.round(state.currentZoom)}%</span>

	<button class="zoom-button" onclick={state.handleZoomIn} aria-label="Zoom in" title="Zoom in">
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				d="M14 13L10 9M11 6.5C11 9.53757 8.53757 12 5.5 12C2.46243 12 0 9.53757 0 6.5C0 3.46243 2.46243 1 5.5 1C8.53757 1 11 3.46243 11 6.5Z"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
			<path d="M5.5 4V9M3 6.5H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
		</svg>
	</button>

	<button
		class="zoom-button"
		onclick={state.handleReset}
		aria-label="Reset zoom"
		title="Reset zoom"
	>
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				d="M8 4V1L3.5 5.5L8 10V7C10.7614 7 13 9.23858 13 12C13 12.1881 12.9895 12.3738 12.969 12.5566"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
			<path
				d="M8 12V15L12.5 10.5L8 6V9C5.23858 9 3 6.76142 3 4C3 3.81193 3.01054 3.62618 3.03101 3.44337"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
		</svg>
	</button>
</div>

<style>
	.zoom-controls {
		display: flex;
		align-items: center;
		gap: 4px;
		background: var(--color-background-primary, #ffffff);
		border: 1px solid var(--color-border-primary, #e0e0e0);
		border-radius: var(--layout-border-radius-md, 0.375rem);
		padding: 4px;
		box-shadow: var(--elevation-level1, 0 1px 3px rgba(0, 0, 0, 0.1));
	}

	.zoom-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		background: transparent;
		color: var(--color-text-primary, #333);
		border-radius: var(--layout-border-radius-sm, 0.125rem);
		cursor: pointer;
		transition: all 150ms var(--motion-easing-ease, ease);
	}

	.zoom-button:hover {
		background: var(--color-background-secondary, #f5f5f5);
	}

	.zoom-button:active {
		background: var(--color-background-tertiary, #e0e0e0);
	}

	.zoom-value {
		padding: 0 8px;
		font-size: 12px;
		font-weight: 500;
		color: var(--color-text-secondary, #666);
		min-width: 40px;
		text-align: center;
	}
</style>
