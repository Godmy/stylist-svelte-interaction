<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import MarqueeTicker from './index.svelte';

	const controls: SlotStory[] = [
		{
			name: 'content',
			type: 'text',
			defaultValue: 'LANKA TOUR'
		},
		{ name: 'separator', type: 'text', defaultValue: '•' },
		{ name: 'speedSeconds', type: 'range', defaultValue: 18, min: 6, max: 48, step: 1 },
		{
			name: 'startPosition',
			type: 'range',
			label: 'start position',
			description: '0 starts at the right edge; 100 starts one full loop ahead.',
			defaultValue: 0,
			min: 0,
			max: 100,
			step: 1
		},
		{ name: 'height', type: 'range', defaultValue: 48, min: 24, max: 120, step: 2 },
		{ name: 'fontSize', type: 'range', defaultValue: 18, min: 10, max: 72, step: 1 },
		{ name: 'backgroundColor', type: 'color', defaultValue: '#0e1714' },
		{ name: 'textColor', type: 'color', defaultValue: '#ffffff' },
		{ name: 'letterTransitionColor', type: 'color', defaultValue: '#0e1714' },
		{ name: 'letterTransitionMs', type: 'range', defaultValue: 760, min: 120, max: 1600, step: 20 },
		{
			name: 'appearEffect',
			type: 'select',
			defaultValue: 'fade',
			options: ['none', 'fade', 'soft']
		},
		{
			name: 'disappearEffect',
			type: 'select',
			defaultValue: 'fade',
			options: ['none', 'fade', 'soft']
		},
		{ name: 'upsideDown', type: 'boolean', defaultValue: true },
		{ name: 'still', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={MarqueeTicker}
	title="MarqueeTicker"
	description="Infinite horizontal scrolling text strip. On text change, letters disappear into the strip background and the new line appears from it."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<MarqueeTicker
				items={[String(values.content || '')]}
				separator={String(values.separator || '•')}
				speedSeconds={Number(values.speedSeconds) || 18}
				startPosition={Number(values.startPosition) || 0}
				height={`${Number(values.height) || 48}px`}
				fontSize={`${Number(values.fontSize) || 18}px`}
				backgroundColor={String(values.backgroundColor || '#0e1714')}
				textColor={String(values.textColor || '#ffffff')}
				letterTransitionColor={String(values.letterTransitionColor || '#0e1714')}
				letterTransitionMs={Number(values.letterTransitionMs) || 760}
				appearEffect={values.appearEffect}
				disappearEffect={values.disappearEffect}
				upsideDown={Boolean(values.upsideDown)}
				still={Boolean(values.still)}
			/>
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		padding: 14px 0;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
</style>
