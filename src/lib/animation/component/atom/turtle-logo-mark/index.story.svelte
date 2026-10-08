<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import TurtleLogoMark from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'tone', type: 'text', defaultValue: '#0e7c7b' },
		{ name: 'accent', type: 'text', defaultValue: '#2ec4b6' },
		{ name: 'shellOpacity', type: 'range', defaultValue: 1, min: 0, max: 1, step: 0.05 },
		{ name: 'spiralOpacity', type: 'range', defaultValue: 1, min: 0, max: 1, step: 0.05 },
		{ name: 'headOpacity', type: 'range', defaultValue: 1, min: 0, max: 1, step: 0.05 },
		{ name: 'frontLeftFlipperOpacity', type: 'range', defaultValue: 1, min: 0, max: 1, step: 0.05 },
		{ name: 'frontRightFlipperOpacity', type: 'range', defaultValue: 1, min: 0, max: 1, step: 0.05 },
		{ name: 'rearFlippersOpacity', type: 'range', defaultValue: 1, min: 0, max: 1, step: 0.05 }
	];
</script>

<Story
	{controls}
	component={TurtleLogoMark}
	title="TurtleLogoMark"
	description="The ЛанкаТур brand mark: a swimming turtle with a spiral shell, split into named parts (shell/spiral/head/flippers) with individual opacity so turtle-photo-to-mark can stagger their reveal. Used as the morph target for the turtle-hero-morph organism."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<TurtleLogoMark
				tone={values.tone}
				accent={values.accent}
				shellOpacity={Number(values.shellOpacity)}
				spiralOpacity={Number(values.spiralOpacity)}
				headOpacity={Number(values.headOpacity)}
				frontLeftFlipperOpacity={Number(values.frontLeftFlipperOpacity)}
				frontRightFlipperOpacity={Number(values.frontRightFlipperOpacity)}
				rearFlippersOpacity={Number(values.rearFlippersOpacity)}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		align-content: center;
		min-height: 12rem;
		max-width: 22rem;
		margin: 0 auto;
		padding: 2rem;
		background: linear-gradient(180deg, #f7f3ec, #cdeef0);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		overflow: hidden;
	}
</style>
