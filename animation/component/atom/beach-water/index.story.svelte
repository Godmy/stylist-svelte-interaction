<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import BeachWater from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'waveStart', type: 'range', defaultValue: 0.46, min: 0.12, max: 0.82, step: 0.02 },
		{ name: 'amplitude', type: 'range', defaultValue: 44, min: 8, max: 78, step: 2 },
		{ name: 'layerOffset', type: 'range', defaultValue: 18, min: 0, max: 42, step: 2 },
		{ name: 'backColor', type: 'color', defaultValue: '#ffffff' },
		{ name: 'middleColor', type: 'color', defaultValue: '#ffffff' },
		{ name: 'frontColor', type: 'color', defaultValue: '#ffffff' },
		{ name: 'still', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	id="animation-atoms-beach-water"
	{controls}
	component={BeachWater}
	category="Animation/Atoms"
	title="BeachWater"
	description="Transparent-top white wave divider with three foam layers drifting at different speeds. Respects prefers-reduced-motion."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<div class="_backdrop" aria-hidden="true"></div>
			<BeachWater
				waveStart={Number(values.waveStart)}
				amplitude={Number(values.amplitude)}
				layerOffset={Number(values.layerOffset)}
				backColor={values.backColor}
				middleColor={values.middleColor}
				frontColor={values.frontColor}
				still={Boolean(values.still)}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		position: relative;
		min-height: 18rem;
		overflow: hidden;
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		background:
			linear-gradient(45deg, rgba(15, 23, 42, 0.07) 25%, transparent 25%),
			linear-gradient(-45deg, rgba(15, 23, 42, 0.07) 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, rgba(15, 23, 42, 0.07) 75%),
			linear-gradient(-45deg, transparent 75%, rgba(15, 23, 42, 0.07) 75%);
		background-position:
			0 0,
			0 12px,
			12px -12px,
			-12px 0;
		background-size: 24px 24px;
	}

	._backdrop {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.04) 100%);
	}

	._c1 :global(.c-beach-water) {
		position: absolute;
		inset: auto 0 0 0;
		height: 62%;
	}
</style>
