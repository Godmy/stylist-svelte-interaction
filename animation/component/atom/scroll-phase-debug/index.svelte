<script lang="ts">
	import type { RecipeScrollPhaseDebug } from '$stylist/animation/interface/recipe/scroll-phase-debug';

	let {
		progress = 0,
		phase = '',
		webgl = false,
		reducedMotion = false
	}: RecipeScrollPhaseDebug = $props();

	let viewportWidth = $state(0);
	let viewportHeight = $state(0);

	function trackViewport(_node: HTMLElement) {
		function update() {
			viewportWidth = window.innerWidth;
			viewportHeight = window.innerHeight;
		}

		update();
		window.addEventListener('resize', update);

		return {
			destroy() {
				window.removeEventListener('resize', update);
			}
		};
	}
</script>

<div class="c-scroll-phase-debug" use:trackViewport aria-hidden="true">
	<div>progress: {progress.toFixed(2)}</div>
	<div>phase: {phase}</div>
	<div>webgl: {webgl}</div>
	<div>reducedMotion: {reducedMotion}</div>
	<div>viewport: {viewportWidth}×{viewportHeight}</div>
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
