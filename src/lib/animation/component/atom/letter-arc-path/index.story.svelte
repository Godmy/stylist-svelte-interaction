<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import LetterArcPath from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'progress', type: 'range', defaultValue: 0.55, min: 0, max: 1, step: 0.01 },
		{ name: 'height', type: 'range', defaultValue: 280, min: 180, max: 420, step: 10 }
	];

	const points = [
		{ x: 60, y: 210 },
		{ x: 180, y: 92 },
		{ x: 360, y: 62 },
		{ x: 540, y: 92 },
		{ x: 660, y: 210 }
	];
</script>

<Story
	id="animation-atoms-letter-arc-path"
	title="LetterArcPath"
	category="Animation/Atoms"
	component={LetterArcPath}
	description="Guide and progress stroke for letters travelling along an arc."
	{controls}
>
	{#snippet children(values: any)}
		<div class="_stage" style:height={`${Number(values.height)}px`}>
			<LetterArcPath {points} progress={Number(values.progress)} width={720} height={280} />
		</div>
	{/snippet}
</Story>

<style>
	._stage {
		position: relative;
		width: min(100%, 45rem);
		overflow: hidden;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background:
			linear-gradient(90deg, rgba(15, 23, 42, 0.06) 1px, transparent 1px),
			linear-gradient(180deg, rgba(15, 23, 42, 0.06) 1px, transparent 1px),
			#f7f3ec;
		background-size: 32px 32px;
	}
</style>
