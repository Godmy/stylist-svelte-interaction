<script lang="ts">
	import Story from '$stylist/theme/component/molecule/story/index.svelte';
	import type { SlotStory } from '$stylist/theme/interface/slot/story';
	import WhaleSpout from './index.svelte';

	const controls: SlotStory[] = [
		{ name: 'tone', type: 'text', defaultValue: '#1f4959' },
		{ name: 'spoutTone', type: 'text', defaultValue: '#d8f2f5' },
		{ name: 'still', type: 'boolean', defaultValue: false }
	];
</script>

<Story
	{controls}
	component={WhaleSpout}
	title="WhaleSpout"
	description="A whale breaking the surface with a periodic blow spout. Respects prefers-reduced-motion."
>
	{#snippet children(values: any)}
		<div class="_c1">
			<WhaleSpout tone={values.tone} spoutTone={values.spoutTone} still={Boolean(values.still)} />
		</div>
	{/snippet}
</Story>

<style>
	._c1 {
		display: grid;
		place-items: center;
		min-height: 14rem;
		padding: 2rem;
		background: linear-gradient(180deg, #cdeef0, #0e5c63);
		border: 1px solid var(--color-border-primary);
		border-radius: 0.5rem;
	}

	._c1 :global(.c-whale-spout) {
		max-width: 20rem;
	}
</style>
