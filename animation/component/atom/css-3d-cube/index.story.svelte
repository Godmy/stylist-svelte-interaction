<script lang="ts">
	import Css3dCube from './index.svelte';
	import type { RecipeCss3dCube } from '$stylist/animation/interface/recipe/css-3d-cube';

	// Render of index.story.ts: auto-rotation drives rotationY from local requestAnimationFrame state.
	let { autoRotate = true, ...args }: RecipeCss3dCube & { autoRotate?: boolean } = $props();

	let animatedY = $state(45);

	$effect(() => {
		if (!autoRotate) return;
		let frame = requestAnimationFrame(function tick() {
			animatedY += 0.5;
			frame = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(frame);
	});
</script>

<div class="_c1">
	<Css3dCube {...args} rotationY={autoRotate ? animatedY : args.rotationY} />
</div>

<style>
	._c1 {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 4rem 0;
		background:
			radial-gradient(circle at 30% 20%, rgba(125, 211, 252, 0.15), transparent 40%),
			radial-gradient(circle at 70% 80%, rgba(165, 180, 252, 0.12), transparent 44%),
			linear-gradient(180deg, #f8fafc, #f1f5f9);
		border-radius: var(--border-radius-xl);
	}
</style>
