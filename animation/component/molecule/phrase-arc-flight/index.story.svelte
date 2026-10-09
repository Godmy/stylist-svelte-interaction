<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import PhraseArcFlight from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'phrase', type: 'text', defaultValue: 'LANKA TOUR' },
		{
			name: 'pathText',
			label: 'polyline',
			type: 'text',
			defaultValue:
				'820,48 740,40 660,64 580,108 500,146 420,136 340,154 260,194 180,212 90,192 0,180 -150,190'
		},
		{ name: 'progress', type: 'range', min: 0, max: 1, step: 0.01, defaultValue: 0.5 },
		{ name: 'amplitude', type: 'range', min: 0, max: 24, step: 1, defaultValue: 7 },
		{ name: 'stagger', type: 'range', min: 0.015, max: 0.08, step: 0.005, defaultValue: 0.035 },
		{ name: 'highlight', type: 'boolean', defaultValue: true },
		{
			name: 'highlightIntensity',
			label: 'glow',
			type: 'range',
			min: 0,
			max: 1,
			step: 0.05,
			defaultValue: 1
		},
		{ name: 'showPath', type: 'boolean', defaultValue: false },
		{ name: 'still', type: 'boolean', defaultValue: true }
	];
</script>

<Story
	{controls}
	component={PhraseArcFlight}
	title="PhraseArcFlight"
	category="Molecules/Animation"
	description="Letters enter from the upper right, travel as one line along an editable arc, bounce lightly, and leave beyond the left edge."
>
	{#snippet children(values: any)}
		<PhraseArcFlight
			phrase={values.phrase || 'LANKA TOUR'}
			pathText={values.pathText}
			progress={Number(values.progress)}
			amplitude={Number(values.amplitude)}
			stagger={Number(values.stagger)}
			highlight={Boolean(values.highlight)}
			highlightIntensity={Number(values.highlightIntensity)}
			showPath={Boolean(values.showPath)}
			still={Boolean(values.still)}
		/>
	{/snippet}
</Story>
