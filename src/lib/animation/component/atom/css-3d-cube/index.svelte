<script lang="ts">
	import type { RecipeCss3dCube } from '$stylist/animation/interface/recipe/css-3d-cube';
	import createCss3dCubeState from './state.svelte';

	let props: RecipeCss3dCube = $props();
	const state = createCss3dCubeState(() => props);
</script>

<div class="scene" {...state.restProps}>
	<div class="cube" style={state.cubeStyle}>
		<div class="face front" style="transform: translateZ({state.halfSize}px)">
			<span>Front</span>
		</div>
		<div class="face back" style="transform: rotateY(180deg) translateZ({state.halfSize}px)">
			<span>Back</span>
		</div>
		<div class="face right" style="transform: rotateY(90deg) translateZ({state.halfSize}px)">
			<span>Right</span>
		</div>
		<div class="face left" style="transform: rotateY(-90deg) translateZ({state.halfSize}px)">
			<span>Left</span>
		</div>
		<div class="face top" style="transform: rotateX(90deg) translateZ({state.halfSize}px)">
			<span>Top</span>
		</div>
		<div class="face bottom" style="transform: rotateX(-90deg) translateZ({state.halfSize}px)">
			<span>Bottom</span>
		</div>
	</div>
</div>

<style>
	.scene {
		display: flex;
		justify-content: center;
		align-items: center;
		perspective: 1000px;
	}

	.cube {
		position: relative;
		transform-style: preserve-3d;
		transition: transform 0.1s linear;
	}

	.face {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		font-weight: 700;
		color: #0f172a;
		border: 2px solid rgba(15, 23, 42, 0.15);
		opacity: 0.9;
	}

	.face span {
		background: rgba(255, 255, 255, 0.6);
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		backdrop-filter: blur(4px);
		pointer-events: none;
	}

	.face.front {
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 197, 253, 0.3));
	}

	.face.back {
		background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(232, 121, 249, 0.3));
	}

	.face.right {
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(134, 239, 172, 0.3));
	}

	.face.left {
		background: linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(254, 205, 137, 0.3));
	}

	.face.top {
		background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(251, 146, 187, 0.3));
	}

	.face.bottom {
		background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(103, 232, 240, 0.3));
	}
</style>
