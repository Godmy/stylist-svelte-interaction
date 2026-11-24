<script lang="ts">
	import type { RecipeScrollPhaseDebug } from '$stylist/animation/interface/recipe/scroll-phase-debug';
	import createScrollPhaseDebugComponentState from '$stylist/animation/component/atom/scroll-phase-debug/state.svelte';

	let {
		progress = 0,
		phase = '',
		webgl = false,
		reducedMotion = false
	}: RecipeScrollPhaseDebug = $props();

	const state = createScrollPhaseDebugComponentState();
	const trackViewport = $derived(state.trackViewport);
</script>

<div class="c-scroll-phase-debug" use:trackViewport aria-hidden="true">
	<div>progress: {progress.toFixed(2)}</div>
	<div>phase: {phase}</div>
	<div>webgl: {webgl}</div>
	<div>reducedMotion: {reducedMotion}</div>
	<div>viewport: {state.viewportWidth}×{state.viewportHeight}</div>
</div>

<style>
	.c-scroll-phase-debug {
		position: fixed;
		left: 12px;
		top: 12px;
		z-index: 999;
		display: grid;
		gap: 2px;
		padding: 8px 10px;
		border-radius: 8px;
		background: rgba(10, 16, 14, 0.82);
		color: #baf2e6;
		font:
			11px/1.4 ui-monospace,
			'SFMono-Regular',
			Menlo,
			monospace;
		pointer-events: none;
		white-space: nowrap;
	}
</style>
