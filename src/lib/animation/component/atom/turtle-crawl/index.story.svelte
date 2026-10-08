<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import TurtleCrawl from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'tone', type: 'text', defaultValue: '#3f6f46' },
		{ name: 'still', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={TurtleCrawl}
	title="TurtleCrawl"
	description="A turtle silhouette paddling across the shore toward the water, looping. Respects prefers-reduced-motion."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<TurtleCrawl tone={values.tone} still={Boolean(values.still)} />
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		align-content: center;
		min-height: 12rem;
		padding: 2rem;
		background: linear-gradient(180deg, #f7f3ec, #cdeef0);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
		overflow: hidden;
	}
</style>
