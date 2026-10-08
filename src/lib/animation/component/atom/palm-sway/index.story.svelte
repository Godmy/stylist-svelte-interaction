<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import PalmSway from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'tone', type: 'text', defaultValue: '#2f6b4f' },
		{ name: 'flip', type: 'boolean', defaultValue: false },
		{ name: 'still', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={PalmSway}
	title="PalmSway"
	description="Ambient swaying palm silhouette. Respects prefers-reduced-motion."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<PalmSway tone={values.tone} flip={Boolean(values.flip)} still={Boolean(values.still)} />
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		place-items: center;
		min-height: 18rem;
		padding: 2rem;
		background: linear-gradient(180deg, #cdeef0, #f7f3ec);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
	}

	._c1 :global(.c-palm-sway) {
		--palm-sway-size: 12rem;
	}
</style>
