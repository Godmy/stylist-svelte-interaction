<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';

	import Css3dCube from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'autoRotate', type: 'boolean', defaultValue: true },
		{ name: 'size', type: 'range', min: 100, max: 300, step: 10, defaultValue: 200 },
		{ name: 'rotationX', type: 'range', min: 0, max: 360, step: 1, defaultValue: 25 },
		{ name: 'rotationY', type: 'range', min: 0, max: 360, step: 1, defaultValue: 45 },
		{ name: 'rotationZ', type: 'range', min: 0, max: 360, step: 1, defaultValue: 0 }
	];

	let animatedY = $state(45);
	let frame: number | null = null;

	function tick() {
		animatedY += 0.5;
		frame = requestAnimationFrame(tick);
	}

	$effect(() => {
		frame = requestAnimationFrame(tick);
		return () => {
			if (frame) cancelAnimationFrame(frame);
		};
	});
</script>

<Story
	{controls}
	component={Css3dCube}
	title="Css3dCube"
	category="Atoms/Architecture"
	description="Объёмный CSS-куб на 3D-трансформациях."
>
	{#snippet children(values: any)}
		<div
			style="
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 4rem 0;
				background:
					radial-gradient(circle at 30% 20%, rgba(125, 211, 252, 0.15), transparent 40%),
					radial-gradient(circle at 70% 80%, rgba(165, 180, 252, 0.12), transparent 44%),
					linear-gradient(180deg, #f8fafc, #f1f5f9);
				border-radius: var(--border-radius-xl);
			"
		>
			<Css3dCube
				size={values.size as number}
				rotationX={values.rotationX as number}
				rotationY={values.autoRotate ? animatedY : (values.rotationY as number)}
				rotationZ={values.rotationZ as number}
			/>
		</div>
	{/snippet}
</Story>
