<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import WaveSurf from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'tone', type: 'text', defaultValue: '#1a8a86' },
		{ name: 'riderTone', type: 'text', defaultValue: '#17231f' },
		{ name: 'still', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={WaveSurf}
	title="WaveSurf"
	description="Breaking wave with a tiny surfer silhouette riding the crest. Respects prefers-reduced-motion."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<WaveSurf tone={values.tone} riderTone={values.riderTone} still={Boolean(values.still)} />
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		place-items: center;
		min-height: 14rem;
		padding: 2rem;
		background: linear-gradient(180deg, #cdeef0, #f7f3ec);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
	}

	._c1 :global(.c-wave-surf) {
		max-width: 20rem;
	}
</style>
