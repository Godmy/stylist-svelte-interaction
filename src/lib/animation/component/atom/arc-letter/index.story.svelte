<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import ArcLetter from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'character', type: 'text', defaultValue: 'L' },
		{ name: 'x', type: 'range', defaultValue: 180, min: 40, max: 320, step: 5 },
		{ name: 'y', type: 'range', defaultValue: 120, min: 40, max: 220, step: 5 },
		{ name: 'opacity', type: 'range', defaultValue: 1, min: 0, max: 1, step: 0.05 },
		{ name: 'rotation', type: 'range', defaultValue: -14, min: -90, max: 90, step: 1 },
		{ name: 'scale', type: 'range', defaultValue: 2.2, min: 0.5, max: 4, step: 0.1 },
		{ name: 'highlight', type: 'range', defaultValue: 0.75, min: 0, max: 1, step: 0.05 }
	];
</script>

<Story
	id="animation-atoms-arc-letter"
	title="ArcLetter"
	category="Animation/Atoms"
	component={ArcLetter}
	description="Single absolutely-positioned letter for animated arc typography."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_stage">
			<ArcLetter
				character={String(values.character || 'L').slice(0, 1)}
				x={Number(values.x)}
				y={Number(values.y)}
				opacity={Number(values.opacity)}
				rotation={Number(values.rotation)}
				scale={Number(values.scale)}
				highlight={Number(values.highlight)}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._stage {
		position: relative;
		width: min(100%, 24rem);
		height: 16rem;
		overflow: hidden;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background: linear-gradient(180deg, #f7f3ec, #d6eef0);
		font-size: 3rem;
	}
</style>
